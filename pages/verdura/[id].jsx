import { useRouter } from 'next/router';
import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';


const VerduraDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch('/data/db.json')
        .then((res) => res.json())
        .then((data) => {
          const verdura = data.verduras.find((item) => item.id === id);
          setData(verdura);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (

    <>
      <Head>
        <title>Verdura: {data.nombre}</title>
        <meta name="description" content={data.descripcion} />
      </Head>

      {/* Breadcrumbs */}
      <nav className="bg-gray-100 py-3 px-4 rounded-md mb-8 shadow-md">
        <ol className="list-reset flex text-gray-700">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Inicio
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <li className="text-gray-500 capitalize">{data.categoria}
              <span className="mx-2">/</span>
            </li>
          </li>
          <li className="text-gray-500">{data.nombre}</li>
        </ol>
      </nav>

      <div className="p-4 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <img src={data.image} alt={data.nombre} className="w-full rounded-lg shadow-md" />
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold mb-4">{data.nombre}</h1>
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
            <h2 className="text-xl font-semibold mt-2 mb-2">Seleccion: </h2>
            <ul className="ml-5">
                <li >{data.seleccion_de_fruto}</li>
            </ul>

          </div>
        </div>
      </div>
      
    </>

  );
};

export default VerduraDetail;
