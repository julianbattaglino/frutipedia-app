import Image from "next/image";
import FruitData from "@/components/FruitData"
import Navbar from "@/components/Nav"
import Head from 'next/head';


const Home = () => {
  return (
    
    <>

      <Head>
        <title>Green Seasons App</title>
        <meta name="description" content="" />
      </Head>

      <Navbar />
    <FruitData />
    </>

  );
}

export default Home;
