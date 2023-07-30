import {categories_items} from "../../assets/data/DataItems";



const CategoryView = ({ label }) => {

  const category = categories_items.find(category => category.label === label)


  return ( 
    <>
    {
      label && category &&
      <div className="flex flex-row items-center gap-4">
        {category?.icon}
        <div className="flex flex-col">
            <h1 className="plain-title font-semibold">{category?.label}</h1>
            <p className="text-neutral-500 font-light plain-text">{category?.description}</p>
        </div>
      </div>
    }
    </>
   );
}
 
export default CategoryView;