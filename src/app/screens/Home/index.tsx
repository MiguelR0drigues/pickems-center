import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      {/* Hero Section */}
      <div className="text-center mb-8 relative w-full">
        <img
          src="/banner.jpg"
          alt="Soccer Action"
          className="w-full h-80 object-cover rounded-lg filter blur-sm"
        />
        <h1 className="text-4xl w-full font-bold mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Welcome to the <span className="text-green-500">PICKEMS CENTER</span>!
        </h1>
      </div>

      <div
        className="w-full mt-10 mb-10"
        style={{ borderTop: "1px solid rgba(500,500,500,0.5)" }}
      >
        {" "}
      </div>

      {/* Overview Section */}
      <section className="flex">
        <div className="text-start gap-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How it Works:</h2>
          <p className="text-lg mb-2">
            1. <span className="text-green-500 text-xl">Predict & Place</span>:
            Drag and drop teams into their predicted group stage standings.
          </p>
          <p className="text-lg mb-2">
            2. <span className="text-green-500 text-xl">Score Big</span>: Get
            rewarded for your accuracy!
          </p>
          <p className="text-lg mb-2">
            3.{" "}
            <span className="text-green-500 text-xl">Leaderboard Showdown</span>
            : Keep track of your ranking as the action unfolds.
          </p>
          <div className="text-start mt-8">
            <Link
              to="/pickems"
              className="inline-block bg-green-700 hover:bg-green-900 text-lg font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Try it now!
            </Link>
          </div>
        </div>
        <img
          src="/phone.png"
          alt="Soccer Action"
          className="w-full rounded-lg"
          style={{ maxWidth: "200px" }}
        />
      </section>

      <div
        className="w-full mt-10 mb-10"
        style={{ borderTop: "1px solid rgba(500,500,500,0.5)" }}
      >
        {" "}
      </div>

      {/* Benefits Section */}
      <h2 className="text-2xl font-semibold mb-4">
        How are the points awarded?
      </h2>
      <div className="text-start w-full">
        <article className="flex flex-col gap-4 mb-10">
          <h2 className="font-bold mb-1 underline underline-offset-4">
            Group Stage
          </h2>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>Predicted advancement and placement for the entire group:</p>
            <p className="text-green-500">+24 points</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>Predicted advancement and placement:</p>
            <p className="text-green-500">+5 points</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>Predicted advancement but not the placement:</p>
            <p className="text-green-500">+2 points</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>Failed to predict advancement</p>
            <p className="text-red-500">-3 points</p>
          </section>
        </article>

        <article className="flex flex-col gap-4">
          <h2 className="font-bold mb-1 underline underline-offset-4">
            Elimination Stage
          </h2>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>Predicted correct winner:</p>
            <p className="text-green-500">+2 points</p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Home;
