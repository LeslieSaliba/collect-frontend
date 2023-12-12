import { Fragment, useState, useEffect } from "react";
import { Menu, Transition, Dialog, Disclosure } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import ProductItem from "../HomeComponents/ProductItem";
import Navbar from "../FrequentlyUsed/NavBar";
import Footer from "../FrequentlyUsed/Footer";

const AllProduct = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const [discount, setDiscount] = useState("");
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState([]);
  const [productPerPage, setProductPerPage] = useState(12); 
  const [range, SetRange] = useState(50);
  const [category, SetCategory] = useState([]);
  const [isSelectedItem, SetIsSelectedItem] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const showModal = () => setMobileFiltersOpen(true);
  const hideModal = () => {
    setMobileFiltersOpen(false);
  };
  const showHideClassName = showModal ? true : false;
  const onChangeCurrent = (id) => {
    setCurrentPage(id);
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product/getAll`
        );

        console.log("Server response:", response.data);

        const data = response.data;

        console.log("data.products", data.data);
        setProducts(data.data);
        console.log("products", products);
        setActiveSection(data.data);
        console.log("activeSectionFirstt", activeSection);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  //Get currentPosts
  const indexOfLastPage = currentPage * productPerPage;
  const indexOfFirstPage = indexOfLastPage - productPerPage;
  const currentPosts = activeSection.slice(indexOfFirstPage, indexOfLastPage);
  const nPage = Math.ceil(activeSection.length / productPerPage);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);

  const sortOptions = [
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const selectedChangeFilter = (value) => {
    console.log(value);
    if (value === "Newest") {
      const newestProduct = products.sort(
        (el1, el2) => new Date(el2.updatedAt) - new Date(el1.updatedAt)
      );
      setActiveSection([...newestProduct]);
    }

    if (value === "Price: Low to High") {
      const lowestPriceGoods = products.sort(
        (el1, el2) => parseFloat(el1.price) - parseFloat(el2.price)
      );
      setActiveSection([...lowestPriceGoods]);
    }
    if (value === "Price: High to Low") {
      const highestPriceGoods = products.sort(
        (el1, el2) => parseFloat(el2.price) - parseFloat(el1.price)
      );
      setActiveSection([...highestPriceGoods]);
    }
  };

  const handleChange = (e) => {
    SetRange(e.target.value);
    const productRange = products.filter(
      (active) => active.price < parseInt(range, 10)
    );

    setActiveSection(productRange);
  };

  const handleChangeCheckBox = (e) => {
    const id = e.target.value;
    const isSelected = e.target.checked;

    if (isSelected) {
      if (id !== "discount" || id === "All") {
        if (id !== "All") {
          SetIsSelectedItem((selectedItem) => {
            const newArray = Array.isArray(selectedItem) ? selectedItem : [];
            const updatedState = [...newArray, id];
            console.log(
              "updatedSelectedItem (immediately after state update)",
              updatedState
            );

            // Set the active section immediately after the state update

            return updatedState;
          });
        } else {
          setActiveSection(products);
        }
      } else {
        setDiscount(id);
        console.log("discount", discount);
      }
    } else {
      if (id !== "discount" && id !== "All")
        SetIsSelectedItem((prevState) => {
          return prevState.filter((value) => value !== id);
        });
      else {
        setDiscount("");
      }

      setActiveSection((prevActiveSection) => {
        return prevActiveSection.filter((dat) => dat.categoryID !== id);
      });
    }
  };

  useEffect(() => {
    console.log(
      "updatedSelectedItem (immediately after state update) useEffect",
      isSelectedItem
    );
    if (discount === "discount") {
      if (isSelectedItem.length > 0) {
        const filteredDiscountDependSelectedItem = activeSection.filter(
          (product) => product.discountPercentage !== 0
        );
        setActiveSection(filteredDiscountDependSelectedItem);
      } else {
        const filteredDiscount = products.filter(
          (product) => product.discountPercentage !== 0
        );
        setActiveSection(filteredDiscount);
      }
    } else if (isSelectedItem.length > 0) {
      const filteredProducts = products.filter((product) =>
        isSelectedItem.includes(product.categoryID)
      );
      setActiveSection(filteredProducts);
    } else {
      setActiveSection(products);
    }
  }, [isSelectedItem, discount]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`http://localhost:8000/category/getAll`);
      const data = response.data;

      SetCategory(data.data);
      console.log(category, data.data);
    };
    fetchCategory();
  }, []);

  const filters = [
    {
      id: "category",
      name: "Our Categories",
    },
  ];
  return (
    <div className="bg-white">
      <Navbar />
      <div>
        {/* Mobile filter dialog */}

        {mobileFiltersOpen && (
          <Transition.Root show={showHideClassName} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={hideModal}
            >
              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={hideModal}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters 1*/}
                    <form className="mt-4 border-t border-gray-200">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-b border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  <div>
                                    <input
                                      name={`${section.id}[]`}
                                      value="All"
                                      type="checkbox"
                                      onChange={handleChangeCheckBox}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                      <strong>All</strong>
                                    </label>
                                  </div>
                                  {category.map((option, optionIdx) => (
                                    <div
                                      key={option.name}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        value={option._id}
                                        type="checkbox"
                                        checked={
                                          isSelectedItem &&
                                          isSelectedItem.includes(option._id)
                                        }
                                        onChange={handleChangeCheckBox}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.name}
                                      </label>
                                      {/* <label className="ml-3 min-w-0 flex-9 text-gray-500">
                                        {option.product}
                                      </label> */}
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-4 py-6"
                      >
                        Price Range
                        <div className="relative mb-6">
                          <label
                            htmlFor="labels-range-input"
                            className="sr-only"
                          >
                            Labels range
                          </label>
                          <input
                            id="labels-range-input"
                            type="range"
                            defaultValue="1000"
                            min="1"
                            max="100"
                            value={range}
                            onChange={handleChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                            Min ($1)
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                            {range}
                          </span>

                          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                            Max ($100)
                          </span>
                        </div>
                      </Disclosure>
                      <Disclosure
                        as="div"
                        className="border-b border-gray-200 px-4 py-6"
                      >
                        <div className="flex items-center">
                          <input
                            id="discount"
                            type="checkbox"
                            value="discount"
                            onChange={handleChangeCheckBox}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="discount"
                            className="ml-3 text-sm text-gray-600"
                          >
                            Discount
                          </label>
                        </div>
                      </Disclosure>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        )}
        {/* Mobile filter dialog */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-end  pb-6 pt-24">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="border border-gray-200 px-4 py-2 group inline-flex justify-between text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort products by
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <li
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => selectedChangeFilter(option.name)}
                            >
                              {option.name}
                            </li>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
              </button> */}
              {/* mobile */}
              <button
                type="button"
                className="-m-2 mr-4 ml-1 p-2 bg-red-600text-gray-400 hover:text-gray-500 sm:ml-1 lg:hidden"
                onClick={showModal}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-20 pt-6">
            <div className="grid  lg:grid-cols-4  grid-cols-1">
              {/* Filters  2*/}

              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-t border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            <div>
                              <input
                                name={`${section.id}[]`}
                                value="All"
                                type="checkbox"
                                onChange={handleChangeCheckBox}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-3 text-sm text-gray-600">
                                <strong>All</strong>
                              </label>
                            </div>
                            {category.map((option, optionIdx) => (
                              <div
                                key={option.id}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  value={option._id}
                                  type="checkbox"
                                  checked={
                                    isSelectedItem &&
                                    isSelectedItem.includes(option._id)
                                  }
                                  onChange={handleChangeCheckBox}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Disclosure as="div" className="border-b border-gray-200  py-6">
                  Price Range
                  <div className="relative mb-6">
                    <label htmlFor="labels-range-input" className="sr-only">
                      Labels range
                    </label>
                    <input
                      id="labels-range-input"
                      type="range"
                      defaultValue="1000"
                      min="1"
                      max="100"
                      value={range}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                      Min ($1)
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                      ${range}
                    </span>

                    <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                      Max ($100)
                    </span>
                  </div>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200  py-6">
                  <div className="flex items-center">
                    <input
                      id="discount"
                      type="checkbox"
                      value="discount"
                      onChange={handleChangeCheckBox}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="discount"
                      className="ml-3 text-sm text-gray-600"
                    >
                      Discount
                    </label>
                  </div>
                </Disclosure>
              </form>

              {/* Product grid */}

              <div className="col-span-3 px-6 ">
               
                
                <div className="flex flex-wrap items-center justify-center md:justify-between sm:justify-between lg:justify-between">
                  {currentPosts.map((product) => (
                    <ProductItem
                      Key={product._id}
                      ProductID={product._id}
                      ProductName={product.name}
                      ProductImage={product.images[0]}
                      ProductStatus={product.status}
                      ProductPrice={product.price}
                      DiscountPercentage={product.discountPercentage}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <li
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={prePage}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </li>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    {pageNumbers.map((n, i) => (
                      <li
                        key={i}
                        href="#"
                        onClick={() => onChangeCurrent(n)}
                        aria-current="page"
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0
                        ${
                          currentPage == n
                            ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            : " "
                        }`}
                      >
                        {n}
                      </li>
                    ))}

                    <li
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      onClick={nextPage}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </li>
                  </nav>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AllProduct;
