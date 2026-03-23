import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { getExpenses, getIncomes } from './api/api';
import { formatCurrency, formatDate } from './utils/formatters';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { BottomNav } from './components/BottomNav';
import { PageHeader } from './components/PageHeader';
import { ExpenseStatCard } from './components/ExpenseStatCard';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseDonutChart } from './components/ExpenseDonutChart';
import { ExpenseAlerts } from './components/ExpenseAlerts';
import { SmartSuggestion } from './components/SmartSuggestion';
import { ExpenseTransactionsTable } from './components/ExpenseTransactionsTable';
import { Utensils, TrendingUp, TrendingDown, Target, Wallet } from 'lucide-react';

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

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  const handleDeleteIncome = (id) => {
    setIncomes(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Dashboard Calculations
  const dashboardData = React.useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const receivedIncome = incomes
      .filter(inc => {
        const d = new Date(inc.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && d <= now;
      })
      .reduce((sum, inc) => sum + Number(inc.amount || 0), 0);

    const monthlyExpenses = expenses
      .filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && d <= now;
      })
      .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

    const availableBalance = receivedIncome - monthlyExpenses;

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const prevMonthIncomes = incomes.filter(inc => {
      const d = new Date(inc.date);
      return d.getMonth() === prevMonth && d.getFullYear() === prevMonthYear;
    });
    const prevMonthTotal = prevMonthIncomes.reduce((sum, inc) => sum + Number(inc.amount || 0), 0);

    let growth = 0;
    if (prevMonthTotal > 0) {
      growth = ((receivedIncome - prevMonthTotal) / prevMonthTotal) * 100;
    } else if (receivedIncome > 0 && prevMonthTotal === 0) {
      growth = 100;
    }
    const incomeGrowth = Math.round(growth);

    const savingsGoal = 1000;
    const savingsProgress = Math.round((availableBalance / savingsGoal) * 100);

    // Combine and sort recent transactions
    const recentTransactions = [
      ...expenses.map(e => ({ ...e, type: "gasto", desc: e.description, category: e.category })),
      ...incomes.map(i => ({ ...i, type: "ingreso", desc: i.description, category: i.source || i.category }))
    ].sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date)).slice(0, 6);

    // Prepare CashFlowChart data (grouped by date)
    const dateMap = {};
    [...expenses, ...incomes].forEach(item => {
      const dateKey = formatDate(item.date, { day: 'numeric', month: 'short' });
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
      receivedIncome,
      monthlyExpenses,
      availableBalance,
      incomeGrowth,
      savingsProgress,
      recentTransactions,
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
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear && d <= now;
    });

    const totalMonthlyIncome = monthlyIncomes.reduce((sum, inc) => sum + Number(inc.amount || 0), 0);

    const dayOfMonth = now.getDate();
    const weeksPassed = Math.max(1, Math.ceil(dayOfMonth / 7));
    const weeklyAverage = totalMonthlyIncome / weeksPassed;

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

  const expenseStats = React.useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const dayOfMonth = now.getDate();

    const monthlyExpenses = expenses.filter(exp => {
      const d = new Date(exp.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalMonthlyExpenses = monthlyExpenses.reduce(
      (sum, exp) => sum + Number(exp.amount || 0),
      0
    );

    const dailyAverage = totalMonthlyExpenses / dayOfMonth;

    // Top Category
    const categoryMap = {};
    monthlyExpenses.forEach(exp => {
      categoryMap[exp.category] = (categoryMap[exp.category] || 0) + Number(exp.amount || 0);
    });

    let topCategory = monthlyExpenses.length > 0 ? 'N/A' : '-';
    let maxAmount = 0;
    Object.entries(categoryMap).forEach(([cat, amount]) => {
      if (amount > maxAmount) {
        maxAmount = amount;
        topCategory = cat;
      }
    });

    return {
      totalMonthlyExpenses,
      dailyAverage,
      topCategory,
      monthlyExpenses
    };
  }, [expenses]);

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[var(--color-main-bg)] selection:bg-[var(--color-accent)] selection:text-white relative">
        <Sidebar activeTab={activeTab} />

        <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full pb-24 md:pb-0">
          <Topbar
            activeTab={activeTab}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

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
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mt-6">
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <ExpenseStatCard
                        title="Gasto total del mes"
                        amount={formatCurrency(expenseStats.totalMonthlyExpenses)}
                        trend="+8%"
                        trendUp={false}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <ExpenseStatCard
                        title="Gasto promedio diario"
                        amount={formatCurrency(expenseStats.dailyAverage)}
                        trend="0%"
                        trendUp={true}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <ExpenseStatCard
                        title="Categoría mayor gasto"
                        amount={expenseStats.topCategory}
                        trend=""
                        trendUp={true}
                        isLargeValue={false}
                        icon={Utensils}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <ExpenseStatCard
                        title="Meta de ahorro"
                        amount={formatCurrency(1000)}
                        trend="+12%"
                        trendUp={true}
                        isLargeValue={false}
                        icon={Target}
                      />
                    </div>
                  </div>

                  {/* Main Content: Chart and Table */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ExpenseChart data={expenses} />
                    </div>
                    <div>
                      <ExpenseDonutChart data={expenses} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <ExpenseTransactionsTable transactions={expenses} onDelete={handleDeleteExpense} />
                  </div>
                </>
              } />

              <Route path="/ingresos" element={
                <>
                  <PageHeader
                    title="Ingresos"
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    onSuccess={loadData}
                  />

                  {/* Top Row: Stat Cards */}
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 mt-6">
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <IncomeStatCard
                        title="Ingreso total del mes"
                        amount={formatCurrency(incomeStats.totalMonthlyIncome)}
                        trend={`+${incomeStats.growth}%`}
                        trendUp={incomeStats.growth >= 0}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <IncomeStatCard
                        title="Ingreso promedio semanal"
                        amount={formatCurrency(incomeStats.weeklyAverage)}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <IncomeStatCard
                        title="Fuente principal"
                        amount={incomeStats.mainSource}
                        trend=""
                        trendUp={true}
                        isLargeValue={false}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <IncomeStatCard
                        title="Crecimiento"
                        amount={`${incomeStats.growth >= 0 ? '+' : ''}${incomeStats.growth}%`}
                        trend={`~${incomeStats.growth >= 0 ? '+' : ''}${incomeStats.growth}%`}
                        trendUp={incomeStats.growth >= 0}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <IncomeChart
                        data={incomes || []}
                        total={formatCurrency(incomeStats.totalMonthlyIncome)}
                        growth={`${incomeStats.growth}%`}
                      />
                    </div>
                    <div>
                      <IncomeDonutChart data={incomes} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <IncomeTransactionsTable transactions={incomes} onDelete={handleDeleteIncome} />
                  </div>
                </>
              } />

              <Route path="/dashboard" element={
                <div className="space-y-6">
                  {/* Dashboard Header is handled by Topbar */}

                  {/* Top Row stats based on real totals from hook/state */}
                  <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <StatCard
                        title="Ingreso del mes"
                        value={formatCurrency(dashboardData.receivedIncome)}
                        trend={`${dashboardData.incomeGrowth >= 0 ? '+' : ''}${dashboardData.incomeGrowth}%`}
                        trendUp={dashboardData.incomeGrowth >= 0}
                        icon={TrendingUp}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <StatCard
                        title="Gastos del mes"
                        value={formatCurrency(dashboardData.monthlyExpenses)}
                        trend=""
                        trendUp={false}
                        icon={TrendingDown}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <StatCard
                        title="Meta de ahorro"
                        value={formatCurrency(dashboardData.savingsGoal)}
                        trend="Objetivo"
                        trendUp={true}
                        icon={Target}
                      />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 snap-center md:min-w-0">
                      <StatCard
                        title="Saldo disponible"
                        value={formatCurrency(dashboardData.availableBalance)}
                        trend=""
                        trendUp={true}
                        icon={Wallet}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <SavingsProgress
                        current={dashboardData.availableBalance}
                        goal={dashboardData.savingsGoal}
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <CashFlowChart
                        incomes={incomes}
                        expenses={expenses}
                        activeFilter={dateFilter.toUpperCase()}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <TransactionsTable transactions={dashboardData.recentTransactions} />
                    </div>
                    <div className="lg:col-span-1">
                      <ExpenseDonutChart data={expenses} />
                    </div>
                  </div>
                </div>
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

        <BottomNav />
      </div>
    </ToastProvider>
  );
}

export default App;
