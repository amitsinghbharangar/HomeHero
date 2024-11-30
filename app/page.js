<<<<<<< HEAD

=======
>>>>>>> dd26452 (project completed)

import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import Businesslist from "@/lib/models/Businesslist";
import Slider from "@/lib/models/Slider";
import { connect } from "@/lib/mongodb";
export default async function Home() {
  await connect();
  const categoryList = await Slider.find({}).lean();
  const businessList = await Businesslist.find({}).lean()
  return (
<<<<<<< HEAD
    <div>
      </div>
=======

    <div className="grid justify-items-center min-h-screen p-4  gap-6 sm:p-3 font-[family-name:var(--font-geist-sans)]">

      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList}
        title={'Popular Business'} />
    </div>

>>>>>>> dd26452 (project completed)
  );
}
