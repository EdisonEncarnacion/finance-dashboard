import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('mes');
  const [selectedMonth, setSelectedMonth] = useState(new Date(2024, 2, 1)); // March 2024

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-main-bg)] selection:bg-[var(--color-accent)] selection:text-white">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        <Topbar activeTab={activeTab} dateFilter={dateFilter} setDateFilter={setDateFilter} />

        <div className="flex-1 p-4 md:p-8 pt-4 max-w-7xl mx-auto w-full">
          {activeTab === 'gastos' && (
            <>
              <PageHeader title="Gastos" selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

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
                  <ExpenseChart />
                </div>
                <div className="lg:col-span-1">
                  <ExpenseDonutChart />
                </div>
              </div>

              {/* Alerts & Suggestions Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ExpenseAlerts />
                <SmartSuggestion />
              </div>

              {/* Bottom Row: Transactions */}
              <div className="grid grid-cols-1 gap-6 pb-12">
                <ExpenseTransactionsTable />
              </div>
            </>
          )}

          {activeTab === 'ingresos' && (
            <>
              <PageHeader title="Ingresos" selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
              {/* Top Row: Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <IncomeStatCard
                  title="Ingreso total del mes"
                  amount="S/ 1,800"
                  trend="+0%"
                  trendUp={true}
                />
                <IncomeStatCard
                  title="Ingreso promedio semanal"
                  amount="S/ 450"
                  trend="+0%"
                  trendUp={true}
                  subtitle=""
                />
                <IncomeStatCard
                  title="Fuente principal"
                  amount="Salario"
                  trend="+0%"
                  trendUp={true}
                  isLargeValue={false}
                />
                <IncomeStatCard
                  title="Crecimiento"
                  amount="+12%"
                  trend="~+12%"
                  trendUp={true}
                />
              </div>

              {/* Middle Row: Income Chart & Donut Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <IncomeChart />
                </div>
                <div className="lg:col-span-1">
                  <IncomeDonutChart />
                </div>
              </div>

              {/* Bottom Row: Transactions */}
              <div className="grid grid-cols-1 gap-6 pb-12">
                <IncomeTransactionsTable />
              </div>
            </>
          )}

          {activeTab === 'dashboard' && (
            <>
              <div className="mb-6"></div> {/* Spacer since Topbar has the title now */}

              {/* Stat Cards row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard type="income" dateFilter={dateFilter} />
                <StatCard type="expense" dateFilter={dateFilter} />
                <StatCard type="savingsGoal" dateFilter={dateFilter} />
                <StatCard type="savings" dateFilter={dateFilter} />
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-1">
                  <SavingsProgress dateFilter={dateFilter} />
                </div>
                <div className="lg:col-span-2">
                  <CashFlowChart dateFilter={dateFilter} />
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
                <div className="lg:col-span-2">
                  <TransactionsTable />
                </div>
                <div className="lg:col-span-1">
                  <ExpenseDonutChart />
                </div>
              </div>
            </>
          )}

          {(activeTab !== 'gastos' && activeTab !== 'ingresos' && activeTab !== 'dashboard') && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-white mb-2">Página en construcción</h2>
              <p className="text-slate-400">Selecciona "Dashboard", "Gastos" o "Ingresos" en el menú.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
