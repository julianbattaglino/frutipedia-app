import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const FrutaDetail = () => {
  const router = useRouter();
  const { nombre, categoria } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (nombre && categoria) {
      fetch('/data/db.json')
        .then((res) => res.json())
        .then((data) => {
          const allItems = [...data.frutas, ...data.verduras];
          const item = allItems.find((item) => item.nombre === decodeURIComponent(nombre) && item.categoria === categoria);
          setData(item);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [nombre, categoria]);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{data.nombre}</title>
        <meta name="description" content={data.descripcion} />
        <meta property="og:title" content={data.nombre} />
        <meta property="og:description" content={data.descripcion} />
        <meta property="og:image" content={data.image} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">{data.nombre}</h1>
        <img src={data.image} alt={data.nombre} className="w-full mb-4" />
        <p className="text-lg mb-4">{data.descripcion}</p>
        <h2 className="text-xl font-semibold mb-2">Beneficios</h2>
        <ul className="list-disc ml-5 mb-4">
          {data.beneficios.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Valores Nutricionales</h2>
        <ul className="list-disc ml-5">
          {Object.entries(data.valores_nutricionales).map(([key, value]) => (
            <li key={key}><strong>{key}:</strong> {value}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FrutaDetail;
