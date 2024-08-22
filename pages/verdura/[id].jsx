import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FrutaDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch('/data/db.json')
        .then((res) => res.json())
        .then((data) => {
          const fruta = data.verduras.find((item) => item.id === id);
          setData(fruta);
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
        <title>Fruta: {data.nombre}</title>
        <meta name="description" content={data.descripcion} />
      </Head>

      {/* Breadcrumbs */}
      <nav className="bg-green py-3 px-4 rounded-md mb-8 shadow-md">
        <ol className="list-reset flex text-gray-700">
          <li>
            <Link href="/" className="cream-10">
              Inicio
            </Link>
            <span className="cream-06 mx-2">/</span>
          </li>
          <li className="cream-06 capitalize">
            {data.categoria}
            <span className="cream-06 mx-2">/</span>
          </li>
          <li className="cream-06">{data.nombre}</li>
        </ol>
      </nav>

      <div className="md:p-8 lg:p-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <img src={data.image} alt={data.nombre} className="w-full rounded-lg shadow-md" />
          </div>
          <div className="lg:col-span-1">


            {/* Tabs */}
            <div role="tablist" className="tabs tabs-lifted">

              {/* Tab 1 Bio */}
              <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Bio" defaultChecked />
              <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

                <div className="mb-3 mt-3 badge badge-accent capitalize">{data.categoria}</div>
                <h1 className="text-3xl font-bold mb-4">{data.nombre}</h1>
                <p className="mb-4">{data.descripcion}</p>

                <h4 className="mt-2 mb-2"><span className="font-semibold">Estacion para consumo:</span></h4>
                <p className="text-sm">{data.estacion}</p>
                <h4 className="mt-2 mb-2"><span className="font-semibold">Clasificación:</span></h4>
                <p className="text-sm">{data.clasificacion}</p>
                <h4 className="mt-2 mb-2"><span className="font-semibold">Cuando cosechar?</span></h4>
                <p className="text-sm">{data.cosecha}</p>
                <h4 className="mt-2 mb-2"><span className="font-semibold">Como germinar?</span></h4>
                <p className="text-sm">{data.como_germinar_y_su_importancia}</p>


                <div className="divider"></div>

                <h2 className="font-semibold mt-2 mb-2">Selección:</h2>
                <p className="text-sm">{data.seleccion_de_fruto}</p>

              </div>

              {/* Tab 2 Beneficios */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="Beneficiós"
              />
              <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

              <h2 className="text-xl font-semibold mb-2">Beneficios</h2>
                <ul className="list-disc ml-5 mb-4">
                  {data.beneficios.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <div className="divider"></div>

                <h2 className="text-xl font-semibold mb-2">Valores Nutricionales</h2>
                <ul className="list-disc ml-5">
                  {Object.entries(data.valores_nutricionales).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>

                <div className="divider"></div>

                <h2 className="font-semibold mt-2 mb-2">Valores diarios recomendados:</h2>
                <ul className="list-disc ml-5">
                  {Object.entries(data.valores_diarios_recomendados).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>


              </div>

            </div>

          </div>
        </div>

        {/* Recetas */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recetas</h2>
          {data.recetas && data.recetas.length > 0 ? (
            data.recetas.map((receta, index) => (
              <div key={index} className="mb-4 border rounded-lg overflow-hidden shadow-md">
                <input type="checkbox" className="peer hidden" id={`collapsible-${index}`} />
                <label htmlFor={`collapsible-${index}`} className="flex justify-between items-center p-4 cursor-pointer bg-green">
                  <h3 className="cream-10 text-lg font-semibold">{receta.nombre}</h3>
                  <svg className="w-6 h-6 text-gray-600 peer-checked:rotate-180 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                <div className="bg-white max-h-0 peer-checked:max-h-screen transition-all duration-500 ease-in-out opacity-0 peer-checked:opacity-100">
                  {/* Recetas Body Container */}
                  <div className="p-4">
                    <img src={receta.image} alt={receta.nombre} className="w-full h-52 object-cover rounded-md mb-4" />
                    <p className="text-gray-700 mb-2">{receta.descripcion}</p>
                    <h4 className="text-md font-semibold mb-1">Ingredientes:</h4>
                    <ul className="list-disc ml-5 mb-2">
                      {receta.ingredientes.map((ingrediente, i) => (
                        <li key={i}>{ingrediente}</li>
                      ))}
                    </ul>
                    <h4 className="text-md font-semibold mb-1">Instrucciones:</h4>
                    <ol className="list-decimal ml-5">
                      {receta.instrucciones.map((instruccion, i) => (
                        <li key={i}>{instruccion}</li>
                      ))}
                    </ol>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p className="font-bold">Sin recetas disponibles</p>
              <p>Actualmente no hay recetas disponibles para este ítem.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FrutaDetail;
