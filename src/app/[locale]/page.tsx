import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }): JSX.Element {
  const t = useTranslations("HomeScreen");
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      {/* Hero Section */}
      <div className="text-center mb-8 relative w-full">
        <Image
          src="/banner.jpg"
          alt="Soccer Action"
          width={100}
          height={100}
          loading="lazy"
          className="w-full h-80 object-cover rounded-lg filter blur-sm"
        />
        <h1 className="text-4xl w-full font-bold mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {t("hero")} <span className="text-green-500">PICKEMS CENTER</span>!
        </h1>
      </div>

      <div
        className="w-full mt-10 mb-10"
        style={{ borderTop: "1px solid rgba(500,500,500,0.5)" }}
      >
        {" "}
      </div>

      {/* Overview Section */}
      <section className="flex items-center pl-2">
        <div className="text-start gap-10 mb-8 sm:gap-8">
          <h2 className="text-2xl font-semibold mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg mb-2">
            1.{" "}
            <span className="text-green-500 text-l sm:text-xl">
              {t("howItWorks.bullet1.title")}
            </span>
            : {t("howItWorks.bullet1.description")}
          </p>
          <p className="text-lg mb-2">
            2.{" "}
            <span className="text-green-500 text-l sm:text-xl">
              {t("howItWorks.bullet2.title")}
            </span>
            : {t("howItWorks.bullet2.description")}
          </p>
          <p className="text-lg mb-2">
            3.{" "}
            <span className="text-green-500 text-l sm:text-xl">
              {t("howItWorks.bullet3.title")}
            </span>
            : {t("howItWorks.bullet3.description")}
          </p>
          <div className="text-start mt-8">
            <Link
              href={`/${params.locale}/pickems`}
              className="inline-block bg-green-700 hover:bg-green-900 text-lg font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              {t("howItWorks.action")}
            </Link>
          </div>
        </div>
        <Image
          src="/phone.png"
          alt="Soccer Action"
          width={100}
          height={100}
          loading="lazy"
          className="w-32 h-60 rounded-lg"
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
      <h2 className="text-2xl font-semibold mb-4">{t("points.title")}</h2>
      <div className="text-start w-full">
        <article className="flex flex-col gap-4 mb-10">
          <h2 className="font-bold mb-1 underline underline-offset-4">
            {t("points.groupStage.title")}
          </h2>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("points.groupStage.bullet1")}</p>
            <p className="text-green-500">+24 {t("points.points")}</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("points.groupStage.bullet2")}</p>
            <p className="text-green-500">+5 {t("points.points")}</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("points.groupStage.bullet3")}</p>
            <p className="text-green-500">+2 {t("points.points")}</p>
          </section>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("points.groupStage.bullet4")}</p>
            <p className="text-red-500">-3 {t("points.points")}</p>
          </section>
        </article>

        <article className="flex flex-col gap-4">
          <h2 className="font-bold mb-1 underline underline-offset-4">
            {t("points.eliminationStage.title")}
          </h2>
          <section className="flex flex-row items-center justify-between gap-3">
            <p>{t("points.eliminationStage.bullet1")}</p>
            <p className="text-green-500">+2 {t("points.points")}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
