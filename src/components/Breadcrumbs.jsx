import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  return (
    <div className="w-full text-left">
      <nav aria-label="breadcrumb" className="block w-full">
        <ul className="flex w-full gap-4 lg:space-x-5 flex-wrap items-center text-sm py-4 px-4">
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>Home</span>
            </a>
            <ChevronRight size={20} />
          </li>
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>Catalog</span>
            </a>
            <ChevronRight size={20} />
          </li>
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>Smartphone</span>
            </a>
            <ChevronRight size={20} />
          </li>
          <li className="flex cursor-pointer space-x-3 items-center  text-gray-500">
            <a href="#">
              <span>Apple</span>
            </a>
            <ChevronRight size={20} />
          </li>
          <li className="flex cursor-pointer space-x-3 items-center  text-black font-semibold">
            <a href="#">
              <span>iPhone 15 Promag</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
