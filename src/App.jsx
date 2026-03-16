import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { getExpenses, getIncomes } from './api/api';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { PageHeader } from './components/PageHeader';
import { ExpenseStatCard } from './components/ExpenseStatCard';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseDonutChart } from './components/ExpenseDonutChart';
import { ExpenseAlerts } from './components/ExpenseAlerts';
import { SmartSuggestion } from './components/SmartSuggestion';
import { ExpenseTransactionsTable } from './components/ExpenseTransactionsTable';
import { Utensils } from 'lucide-react';

// Income Components
import { IncomeStatCard } from './components/IncomeStatCard';
import { IncomeChart } from './components/IncomeChart';
import { IncomeDonutChart } from './components/IncomeDonutChart';
import { IncomeTransactionsTable } from './components/IncomeTransactionsTable';

// Dashboard Components
import { StatCard } from './components/StatCard';
import { SavingsProgress } from './components/SavingsProgress';
import { CashFlowChart } from './components/CashFlowChart';
import { TransactionsTable } from './components/TransactionsTable';

function App() {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1] || 'dashboard';

  const [dateFilter, setDateFilter] = useState('mes');
  const [selectedMonth, setSelectedMonth] = useState(new Date(2024, 2, 1)); // March 2024

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  const loadData = async (newRecord, type) => {
    if (newRecord) {
      if (type === 'expense') {
        setExpenses(prev => [newRecord, ...prev]);
      } else if (type === 'income') {
        setIncomes(prev => [newRecord, ...prev]);
      }
      return;
    }

    try {
      const expData = await getExpenses();
      const incData = await getIncomes();
      setExpenses(expData);
      setIncomes(incData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dashboard Calculations
  const dashboardData = React.useMemo(() => {
    const totalIncome = incomes.reduce((sum, inc) => sum + Number(inc.amount || 0), 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
    const savings = totalIncome - totalExpenses;
    const savingsGoal = 1000;
    const savingsProgress = Math.round((savings / savingsGoal) * 100);

    // Combine and sort recent transactions
    const recentTransactions = [
      ...expenses.map(e => ({ ...e, type: "gasto", desc: e.description })),
      ...incomes.map(i => ({ ...i, type: "ingreso", desc: i.description }))
    ].sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date)).slice(0, 5);

    // Prepare CashFlowChart data (grouped by date)
    const dateMap = {};
    [...expenses, ...incomes].forEach(item => {
      const dateKey = new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      if (!dateMap[dateKey]) dateMap[dateKey] = { name: dateKey, ingresos: 0, gastos: 0 };
      if (expenses.includes(item)) {
        dateMap[dateKey].gastos += Number(item.amount);
      } else {
        dateMap[dateKey].ingresos += Number(item.amount);
      }
    });

    // Sort chart data by actual date
    const cashFlowData = Object.values(dateMap).sort((a, b) => new Date(a.name) - new Date(b.name));

    return {
      totalIncome,
      totalExpenses,
      savings,
      savingsProgress,
      recentTransactions,
      cashFlowData,
      savingsGoal
    };
  }, [expenses, incomes]);

  // Income Module Calculations
  const incomeStats = React.useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyIncomes = incomes.filter(inc => {
      const d = new Date(inc.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalMonthlyIncome = monthlyIncomes.reduce((sum, inc) => sum + Number(inc.amount || 0), 0);
    const weeklyAverage = totalMonthlyIncome / 4;

    // Group by source (category field is used in TransactionModal)
    const sourceMap = {};
    incomes.forEach(inc => {
      const source = inc.source || inc.category || 'Otros';
      sourceMap[source] = (sourceMap[source] || 0) + Number(inc.amount || 0);
    });

    let mainSource = incomes.length > 0 ? 'N/A' : '-';
    let maxAmount = 0;
    Object.entries(sourceMap).forEach(([source, amount]) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        mainSource = source;
      }
    });

    // Crecimiento
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthIncomes = incomes.filter(inc => {
      const d = new Date(inc.date);
      return d.getMonth() === prevMonth && d.getFullYear() === prevMonthYear;
    });
    const prevMonthTotal = prevMonthIncomes.reduce((sum, inc) => sum + Number(inc.amount || 0), 0);

    let growth = 0;
    if (prevMonthTotal > 0) {
      growth = ((totalMonthlyIncome - prevMonthTotal) / prevMonthTotal) * 100;
    } else if (totalMonthlyIncome > 0 && prevMonthTotal === 0) {
      growth = 100;
    }

    return {
      totalMonthlyIncome,
      weeklyAverage,
      mainSource,
      growth: Math.round(growth),
      monthlyIncomes
    };
  }, [incomes]);

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[var(--color-main-bg)] selection:bg-[var(--color-accent)] selection:text-white">
        <Sidebar activeTab={activeTab} />

        <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
          <Topbar activeTab={activeTab} dateFilter={dateFilter} setDateFilter={setDateFilter} />

          <div className="flex-1 p-4 md:p-8 pt-4 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/gastos" element={
                <>
                  <PageHeader
                    title="Gastos"
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    onSuccess={loadData}
                  />

                  {/* Top Row: Stat Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-6">
                    <ExpenseStatCard
                      title="Gasto total del mes"
                      amount="S/ 650"
                      trend="+8%"
                      trendUp={false}
                    />
                    <ExpenseStatCard
                      title="Gasto promedio diario"
                      amount="S/ 21"
                      trend="0%"
                      trendUp={true}
                    />
                    <ExpenseStatCard
                      title="Categoría mayor gasto"
                      amount="Comida"
                      trend=""
                      trendUp={true}
                      isLargeValue={false}
                      icon={Utensils}
                    />
                    <ExpenseStatCard
                      title="Variación vs mes anterior"
                      amount="+8%"
                      trend="~+8%"
                      trendUp={false}
                    />
                  </div>

                  {/* Middle Row: Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                      <ExpenseChart data={expenses} />
                    </div>
                    <div className="lg:col-span-1">
                      <ExpenseDonutChart data={expenses} />
                    </div>
                  </div>

                  {/* Bottom Row: Transactions */}
                  <div className="grid grid-cols-1 gap-6 pb-12">
                    <ExpenseTransactionsTable transactions={expenses} />
                  </div>
                </>
              } />

              <Route path="/ingresos" element={
                <>
                  <PageHeader title="Ingresos" selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} onSuccess={loadData} />
                  {/* Top Row: Stat Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <IncomeStatCard
                      title="Ingreso total del mes"
                      amount={`S/ ${incomeStats.totalMonthlyIncome.toLocaleString()}`}
                      trend={`+${incomeStats.growth}%`}
                      trendUp={incomeStats.growth >= 0}
                    />
                    <IncomeStatCard
                      title="Ingreso promedio semanal"
                      amount={`S/ ${incomeStats.weeklyAverage.toLocaleString()}`}
                      trend=""
                      trendUp={true}
                      subtitle=""
                    />
                    <IncomeStatCard
                      title="Fuente principal"
                      amount={incomeStats.mainSource}
                      trend=""
                      trendUp={true}
                      isLargeValue={false}
                    />
                    <IncomeStatCard
                      title="Crecimiento"
                      amount={`${incomeStats.growth >= 0 ? '+' : ''}${incomeStats.growth}%`}
                      trend={`~${incomeStats.growth >= 0 ? '+' : ''}${incomeStats.growth}%`}
                      trendUp={incomeStats.growth >= 0}
                    />
                  </div>

                  {/* Middle Row: Income Chart & Donut Chart */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                      <IncomeChart
                        data={incomes}
                        total={incomeStats.totalMonthlyIncome}
                        growth={incomeStats.growth}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <IncomeDonutChart data={incomes} />
                    </div>
                  </div>

                  {/* Bottom Row: Transactions */}
                  <div className="grid grid-cols-1 gap-6 pb-12">
                    <IncomeTransactionsTable transactions={incomes} />
                  </div>
                </>
              } />

              <Route path="/dashboard" element={
                <>
                  <div className="mb-6"></div> {/* Spacer since Topbar has the title now */}

                  {/* Stat Cards row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                      type="income"
                      dateFilter={dateFilter}
                      value={`S/ ${dashboardData.totalIncome.toLocaleString()}`}
                    />
                    <StatCard
                      type="expense"
                      dateFilter={dateFilter}
                      value={`S/ ${dashboardData.totalExpenses.toLocaleString()}`}
                    />
                    <StatCard
                      type="savingsGoal"
                      dateFilter={dateFilter}
                      value="S/ 1,000"
                    />
                    <StatCard
                      type="savings"
                      dateFilter={dateFilter}
                      value={`S/ ${dashboardData.savings.toLocaleString()}`}
                    />
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-1">
                      <SavingsProgress
                        dateFilter={dateFilter}
                        current={dashboardData.savings}
                        goal={dashboardData.savingsGoal}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <CashFlowChart
                        dateFilter={dateFilter}
                        data={dashboardData.cashFlowData}
                      />
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
                    <div className="lg:col-span-2">
                      <TransactionsTable transactions={dashboardData.recentTransactions} />
                    </div>
                    <div className="lg:col-span-1">
                      <ExpenseDonutChart data={expenses} />
                    </div>
                  </div>
                </>
              } />

              <Route path="*" element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-bold text-white mb-2">Página en construcción</h2>
                  <p className="text-slate-400">Selecciona "Dashboard", "Gastos" o "Ingresos" en el menú.</p>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;
