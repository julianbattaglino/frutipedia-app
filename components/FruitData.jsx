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
      allItems = allItems.filter(item => item.cosecha === month);
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
      <div className="filters flex flex-wrap gap-4 p-4 bg-stone-50 rounded-lg shadow-md">

        {/*  Type Filters */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Seleccionar por tipo</span>
            <span className="label-text-alt">Ej: Fruta</span>
          </div>
          <select className="select select-success w-full max-w-xs select-sm rounded"
            id="type"
            onChange={(e) => setType(e.target.value)}
            value={type}>
            <option selected value="all">Todos</option>
            <option value="fruta">Frutas</option>
            <option value="verdura">Verduras</option>
          </select>
        </label>

        {/*  Season Filters */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Estación de consumo</span>
            <span className="label-text-alt">Ej: Otoño</span>
          </div>
          <select className="select select-success w-full max-w-xs select-sm rounded"
            id="season"
            onChange={(e) => setSeason(e.target.value)}
            value={season}
          >
            <option value="all">Todas las estaciones</option>
            <option value="primavera">Primavera</option>
            <option value="verano">Verano</option>
            <option value="otoño">Otoño</option>
            <option value="invierno">Invierno</option>
          </select>
        </label>

        {/*  Month Filters */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Cosecha</span>
            <span className="label-text-alt">Ej: Enero</span>
          </div>
          <select className="select select-success w-full max-w-xs select-sm rounded"
            id="month"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          >
            <option selected value="all">Todos los meses</option>
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
        </label>

        {/*  Clasification Filters */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Clasificaciòn</span>
            <span className="label-text-alt">Ej: Citrico</span>
          </div>
          <select className="select select-success w-full max-w-xs select-sm rounded"
            id="classification"
            onChange={(e) => setClassification(e.target.value)}
            value={classification}
          >
            <option selected value="all">Todas las clasificaciones</option>
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
        </label>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
        {filteredData.map((item) => (
          <Link key={item.id} href={`/${item.categoria}/${item.id}`}>
            <div className="hover:scale-[1.01] ease-out duration-300 max-w-sm rounded overflow-hidden shadow-lg">
              <img className="grid-imgs" src={item.image} alt={item.nombre} />
              <div className="px-6 py-4">
                <div className="mb-3 mt-3 badge badge-accent capitalize">{item.categoria}</div>
                <div className="font-bold text-xl mb-2">{item.nombre}</div>
                <button className="btn btn-xs">
                  Ver detalles
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default FruitData;
