import Hero from "../../Components/Hero/Hero";
import Categories from "../../Components/Categories/Categories";
import FlashDeals from "../../Components/FlashDeals/FlashDeals";
import BestSellers from "../../Components/BestSellers/BestSellers";
import NewArrivals from "../../Components/NewArrivals/NewArrivals";
import Recommended from "../../Components/Recommended/Recommended";
import Brands from "../../Components/Brands/Brands";
import Newsletter from "../../Components/Newsletter/Newsletter";

function Home() {
  return (
    <main>
      <Hero />

      <Categories />

      <FlashDeals />

      <BestSellers />

      <NewArrivals />

      <Recommended />

      <Brands />

      <Newsletter />
      
    </main>
  );
}

export default Home;