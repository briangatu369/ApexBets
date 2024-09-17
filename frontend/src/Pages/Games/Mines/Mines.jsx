import Grid from "./Grid/Grid";
import Controller from "./Controller/Controller";
import MinesHeader from "./Components/MinesHeader";
import MinesProvider from "./Context/MinesProvider";

const Mines = () => {
  return (
    <MinesProvider>
      <div className="px-1">
        <MinesHeader />
        <div className="flex flex-col-reverse items-center bg-secondary lg:flex-row lg:items-stretch py-1 px-2 mb-2 rounded-lg ">
          <Controller />
          <Grid />
        </div>
      </div>
    </MinesProvider>
  );
};

export default Mines;
