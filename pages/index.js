import Image from "next/image";
import FruitData from "@/components/FruitData"
import Head from 'next/head';


const Home = () => {
  return (
    
    <>

      <Head>
        <title>Green Seasons App</title>
        <meta name="description" content="" />
      </Head>


    <FruitData />
    </>

  );
}

export default Home;
