import { IconType } from "react-icons";
import {categories_items} from "../../assets/data/DataItems";

// interface CategoryViewProps {
//   icon: IconType,
//   label: string,
//   description: string
// }

const CategoryView = ({ label }) => {

  const category = categories_items.find(category => category.label === label)


  return ( 
    <>
    {
      label && category &&
      <div className="flex flex-row items-center gap-4">
        {/* <Icon size={40} className="text-neutral-600" /> */}
        {category?.icon}
        <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{category?.label}</h1>
            <p className="text-neutral-500 font-light">{category?.description}</p>
        </div>
      </div>
    }
    </>
   );
}
 
export default CategoryView;