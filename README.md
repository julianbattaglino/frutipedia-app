
# Green Seasons App

## Descripción

Green Seasons es una aplicación desarrollada en Next.js que permite a los usuarios explorar información sobre diferentes frutas, verduras, hortalizas y hongos. La aplicación ofrece detalles específicos de cada categoría y usa Tailwind CSS para estilizado.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para la creación de aplicaciones web con renderizado del lado del servidor (SSR) y generación de sitios estáticos.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para el desarrollo rápido y estilizado basado en utilidades.
- **DaisyUI**: Plugin de componentes para Tailwind CSS.
- **Heroicons**: Conjunto de iconos SVG optimizados para React.

## Scripts Disponibles

- `dev`: Inicia el entorno de desarrollo.
- `build`: Compila la aplicación para producción.
- `start`: Inicia la aplicación en modo producción.
- `lint`: Ejecuta el linter de código.

## Estructura de Carpetas

- **pages/**: Contiene las páginas principales del proyecto.
  - `index.js`: Página principal de la aplicación.
  - `/_app.js`: Componente base que envuelve la aplicación.
  - `/_document.js`: Personalización del documento HTML base.
  - `/fruta/[id].jsx`: Página dinámica que muestra información sobre frutas.
  - `/verdura/[id].jsx`, `/hortaliza/[id].jsx`, `/hongo/[id].jsx`: Páginas dinámicas para otros tipos de productos.
  
- **components/**: Componentes reutilizables que estructuran la UI.
  - `Nav.jsx`: Barra de navegación de la aplicación.
  - `Footer.jsx`: Pie de página.
  - `FruitData.jsx`: Componente que muestra los datos específicos de cada fruta.
  - `FrutaDetail.jsx`: Componente para mostrar detalles más específicos de una fruta seleccionada.

- **styles/**:
  - `globals.css`: Archivo de estilos globales.

- **public/**: Contiene los archivos públicos, como imágenes y el favicon.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/julianbattaglino/frutipedia-app.git
   cd frutipedia-app
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

## Notas Adicionales

- El proyecto utiliza Tailwind CSS con DaisyUI para estilos rápidos y personalizados.
- Se recomienda revisar el archivo `tailwind.config.js` para ajustar configuraciones de diseño.
