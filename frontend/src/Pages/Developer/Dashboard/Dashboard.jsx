import { GoProjectRoadmap } from "react-icons/go";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { loggedUser } = useSelector((state) => state.user);
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Morning!";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Afternoon!";
  } else {
    greeting = "Evening!";
  }

  return (
    <section>
      {/* Gtrrting */}
      <div>
        <h2 className="text-xl font-medium text-neutral/90">
          Hey {loggedUser?.data?.name},
        </h2>
        <h2 className="text-3xl font-semibold text-neutral/95 sm:text-3xl md:text-4xl">
          Good {greeting}
        </h2>
      </div>

      {/* cards */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        <div className="rounded bg-base-100 p-4 shadow">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="sm:text-lg">Total Projects</h3>
            </div>
            <div>
              <GoProjectRoadmap className="text-2xl text-primary" />
            </div>
          </div>

          <p className="font-medium text-primary">0</p>
        </div>

        <div className="rounded bg-base-100 p-4 shadow">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="sm:text-lg">Total Asign Projects</h3>
            </div>
            <div>
              <GoProjectRoadmap className="text-2xl text-primary" />
            </div>
          </div>

          <p className="font-medium text-primary">0</p>
        </div>

        <div className="rounded bg-base-100 p-4 shadow">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="sm:text-lg">Total On Going Projects</h3>
            </div>
            <div>
              <GoProjectRoadmap className="text-2xl text-primary" />
            </div>
          </div>

          <p className="font-medium text-primary">0</p>
        </div>

        <div className="rounded bg-base-100 p-4 shadow">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="sm:text-lg">Total Completed Projects</h3>
            </div>
            <div>
              <GoProjectRoadmap className="text-2xl text-primary" />
            </div>
          </div>

          <p className="font-medium text-primary">0</p>
        </div>
      </div>
    </section>
  );
}
