import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarComponent } from "@/components/calendar/Calendar";

const Calendar = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Calendar</h1>
          <p className="text-slate-600">
            Manage appointments and schedule visits
          </p>
        </div>
        <CalendarComponent />
      </div>
    </Layout>
  );
};

export default Calendar;
