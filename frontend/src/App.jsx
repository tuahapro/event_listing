import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import EventList from "@/pages/EventList";
import EventDetail from "@/pages/EventDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/category/:category" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
