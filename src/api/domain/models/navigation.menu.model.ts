import { AppDataSource } from "../../config/db"
import { NavigationItemPage } from "../entities/navigation.item.category.entities";
import { NavigationItem } from "../entities/navigation.items.entities";
import { NavigationMenu } from "../entities/navigation.menus.entities"

const navigationMenusRepository = AppDataSource.getRepository(NavigationMenu);
const navigationItemsRepository = AppDataSource.getRepository(NavigationItem);
const navigationItemPageRepository = AppDataSource.getRepository(NavigationItemPage);


const buildTree = (items: NavigationItem[], parentId: number | null = null, level = 1): any[] => {
  return items
    .filter(item => (item.parent ? item.parent.id : null) === parentId) // sirf direct children
    .sort((a,b) => (a.display_order ?? 0) - (b.display_order ?? 0)) // desc order
    .map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      level,
      page: item.page || null,
      specialty: item.specialty || null,
      children: buildTree(items, item.id, level + 1) // next level
    }));
};


const sideBarBuildTree = (items: NavigationItem[], parentId: number | null = null, level = 1, maxLevel = 2): any[] => {
  return items
    .filter(item => (item.parent ? item.parent.id : null) === parentId) // direct children
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      level,
      page: item.page || null,
      specialty: item.specialty || null,
      children: level < maxLevel ? sideBarBuildTree(items, item.id, level + 1, maxLevel) : [] // stop at 2 levels
    }));
};

export const getNavigationMenu = async (
  callback: (error: any, result: any) => void
) => {
  try {
    const menuRepo = AppDataSource.getRepository(NavigationMenu);

    const menus = await menuRepo.find({
      where: { is_active: true },
      relations: ["items", "items.parent", "items.page", "items.specialty"],
      order: { id: "ASC" }
    });

    const result = menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      location: menu.location,
      is_active: menu.is_active,
      items: buildTree(menu.items || [], null, 1) // sirf top-level items
    }));

    return callback(null, result);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const getadminMenus = async (
  callback: (error: any, result: any) => void
) => {
  try {
    const menuRepo = AppDataSource.getRepository(NavigationMenu);

    const menus = await menuRepo.find({
      where: { is_active: true },
      relations: ["items", "items.parent", "items.page", "items.specialty"],
      order: { id: "ASC" }
    });

    const result = menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      location: menu.location,
      is_active: menu.is_active,
      items: buildTree(menu.items || [], null, 1) // sirf top-level items
    }));

    return callback(null, result);
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const getSideBarMenu = async (
  callback: (error: any, result: any) => void
) => {
  try {
    const menuRepo = AppDataSource.getRepository(NavigationMenu);

    const menus = await menuRepo.find({
      where: { is_active: true, slug:"main-header-menu" },
      relations: [
        "items", 
        "items.parent", 
        "items.page", 
        "items.specialty"
      ],
      order: { id: "ASC" }
    });

    const result = menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      location: menu.location,
      is_active: menu.is_active,
      items: sideBarBuildTree(menu.items || [], null, 1) // sirf top-level items
    }));

    return callback(null, result);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const getMenus = async (
  callback: (error: any, result: any) => void
) => {
  try {
    const menus = await navigationMenusRepository.find({
      relations: ["items"], // include menu items
      order: { id: "ASC" },
    });
    return callback(null, menus);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
  }
};

export const createMainMenu = async (
  reqBody: any,
  callback: (error: any, result: any) => void
) => {
  try {
    const {name, location, is_active = true} = reqBody;
    if(!name || !location){
      return callback("Name and location are required.",null)
    }

    const menu = navigationMenusRepository.create({
      name,
      location,
      is_active,
    });

    await navigationMenusRepository.save(menu);
    return callback(null, menu);

  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const createNavigationItem = async (
  reqBody: any,
  callback: (error: any, result: any) => void
) => {
  try {
    const {
      menu_id,
      parent_id = null,
      title,
      url = null,
      page_id = null,
      specialty_id = null,
      target = "_self",
      icon_class = null,
      display_order = 0,
      is_active = true,
      navigation_item_id,
      slug
    } = reqBody;

    // ✅ Validate required fields
    if (!menu_id || !title) {
      return callback("menu_id and title are required.", null);
    }

    // ✅ Create new entity
    const item = navigationItemsRepository.create({
      menu_id,
      parent_id,
      title,
      slug,
      page_id: navigation_item_id && null,
      specialty_id,
      target,
      icon_class,
      display_order,
      is_active,
    });

    // ✅ Save to DB
    await navigationItemsRepository.save(item);

    if(navigation_item_id){
      // ✅ Create new entity
      const item = navigationItemPageRepository.create({
        navigation_item_id,
        page_id: page_id
      });

      // ✅ Save to DB
      await navigationItemPageRepository.save(item);
    }
    return callback(null, item);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const createNavPageItemMenu = async (
  reqBody: any,
  callback: (error: any, result: any) => void
) => {
  try {
    const {
      menu_id,
      parent_id = null,
      title,
      url = null,
      page_id = null,
      specialty_id = null,
      target = "_self",
      icon_class = null,
      display_order = 0,
      is_active = true,
      navigation_item_id
    } = reqBody;

    // ✅ Validate required fields
    if (!menu_id || !title) {
      return callback("menu_id and title are required.", null);
    }

    // ✅ Create new entity
    const item = navigationItemPageRepository.create({
      navigation_item_id,
    });

    // ✅ Save to DB
    await navigationItemPageRepository.save(item);

    return callback(null, item);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const getMenuItemsById = async (
  menuItemId:number,
  callback: (error: any, result: any) => void
) => {
  try {
    const itemRepo = AppDataSource.getRepository(NavigationItem);

    const menuItem = await itemRepo.findOne({
      where: { id: menuItemId, is_active: true },
      relations: [
        // "parent", 
        "page", 
        "specialty", 
        "children"
      ], // adjust if you need children too
    });

    if (!menuItem) {
      return callback("Menu item not found", null);
    }

    return callback(null, menuItem);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const updateMenuitem = async (
  menuId: number,
  reqBody: any,
  callback: (error: any, result: any) => void
) => {
  try {
   
    const { title, slug, display_order, status, parent_id, page_id } = reqBody

    const menuRepo = AppDataSource.getRepository(NavigationItem);
    const menuItem = await menuRepo.findOne({ where: { id : menuId} });

    if (!menuItem) {
      return callback("Menu item not found", null)
    }

    // Update fields if provided
    if (title !== undefined) menuItem.title = title;
    if (slug !== undefined) menuItem.slug = slug;
    if (display_order !== undefined) menuItem.display_order = display_order;
    if (status !== undefined) menuItem.status = status;
    if (parent_id !== undefined) menuItem.parent_id = parent_id;
    if (page_id !== undefined) menuItem.page_id = page_id;
    
    await menuRepo.save(menuItem);

    return callback(null, menuItem);
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const deleteMenuitem = async (
    menuitemId: number,
    callback: (error: any, result: any) => void
) => {
  try {
   await navigationItemsRepository.delete({id: menuitemId});
   return callback(null,"Delete successfully.")
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
    return callback("Unknown error occurred", null);
  }
};

export const deleteNavPageItemMenu = async (
  menuItemId: number,
  callback: (error: any, result: any) => void
) => {
  try {
    await navigationItemPageRepository.delete({id: menuItemId});
    return callback(null,"Delete successfully.")
  } catch (error) {
    if (error instanceof Error) {
      return callback(error.message, null);
    }
  }
}