import Calendar from "./components/Calendar";


const CalendarWorkspace = () => {
  return (
    <div className="flex flex-1 min-w-0 gap-2 ">
      
      {/* Center Feed Column */}
      <main className="flex  w-full h-screen pt-13  min-w-0">
        <Calendar />
      </main>

    </div>
  );
};

export default CalendarWorkspace;