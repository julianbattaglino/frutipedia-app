import Link from 'next/link';
import { useState, useEffect } from 'react';

const FruitData = () => {
  const [data, setData] = useState({ frutas: [], verduras: [] });
  const [isLoading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState('all');
  const [season, setSeason] = useState('all');
  const [month, setMonth] = useState('all');
  const [classification, setClassification] = useState('all');

  useEffect(() => {
    fetch('/data/db.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData([...data.frutas, ...data.verduras]);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterData();
  }, [type, season, month, classification]);

  const filterData = () => {
    let allItems = [...data.frutas, ...data.verduras];

    if (type !== 'all') {
      allItems = allItems.filter(item => item.categoria === type);
    }

    if (season !== 'all') {
      allItems = allItems.filter(item => item.estacion === season);
    }

    if (month !== 'all') {
      allItems = allItems.filter(item => item.siembra === month);
    }

    if (classification !== 'all') {
      allItems = allItems.filter(item => item.clasificacion === classification);
    }

    setFilteredData(allItems);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (!data.frutas.length && !data.verduras.length) return <p>No pudimos cargar la información, refresca la página.</p>;

  return (
    <div>
      <div className="filters flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="filter-item">
          <label htmlFor="type" className="block mb-1 text-gray-700">Categoría:</label>
          <select
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="all">Todos</option>
            <option value="fruta">Frutas</option>
            <option value="verdura">Verduras</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="season" className="block mb-1 text-gray-700">Estación:</label>
          <select
            id="season"
            onChange={(e) => setSeason(e.target.value)}
            value={season}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="all">Todas las estaciones</option>
            <option value="primavera">Primavera</option>
            <option value="verano">Verano</option>
            <option value="otoño">Otoño</option>
            <option value="invierno">Invierno</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="month" className="block mb-1 text-gray-700">Mes de Siembra:</label>
          <select
            id="month"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="all">Todos los meses</option>
            <option value="enero">Enero</option>
            <option value="febrero">Febrero</option>
            <option value="marzo">Marzo</option>
            <option value="abril">Abril</option>
            <option value="mayo">Mayo</option>
            <option value="junio">Junio</option>
            <option value="julio">Julio</option>
            <option value="agosto">Agosto</option>
            <option value="septiembre">Septiembre</option>
            <option value="octubre">Octubre</option>
            <option value="noviembre">Noviembre</option>
            <option value="diciembre">Diciembre</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="classification" className="block mb-1 text-gray-700">Clasificación:</label>
          <select
            id="classification"
            onChange={(e) => setClassification(e.target.value)}
            value={classification}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          >
            <option value="all">Todas las clasificaciones</option>
            <option value="Fruta de hueso">Fruta de hueso</option>
            <option value="Fruta de grano">Fruta de grano</option>
            <option value="Cítrico">Cítrico</option>
            <option value="Fruta tropical">Tropical</option>
            <option value="Hoja">Hoja</option>
            <option value="Bulbo">Bulbo</option>
            <option value="Raíz">Raíz</option>
            <option value="Fruto">Fruto</option>
            <option value="Crucífera">Crucífera</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
        {filteredData.map((item) => (
          <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="grid-imgs" src={item.image} alt={item.nombre} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.nombre}</div>
               {/*  <p className="text-gray-700 text-base">{item.descripcion}</p> */}
              <Link className="text-blue-500 hover:underline" href={`/${item.categoria}/${item.id}`}>
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FruitData;
