import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Dashboard from "./pages/dashboard/dashboard";
import Income from "./pages/income/income";
import Expense from "./pages/expense/expense";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/incomes" element={<Income />} />
        <Route path="/expenses" element={<Expense />} />
      </Route>
    </Routes>
  );
}

export default App;
