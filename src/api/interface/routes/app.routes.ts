// @ts-ignore
import express, { Request, Response } from "express";
import verifyToken, { adminProtector } from "../../middlewares/verifyToken";
import path from "path";
import { login, register } from "../controllers/user.controller";
import { deleteSettings, settings,bulkUpdateSettingsHandler , uploadFile, header } from "../controllers/site.settings.controller";
import { uploadMedia } from "../../helpers/utility";
import { createContentBlockData, deleteContentBlock, deleteContentBlockMedia, home, homeAdmin, homePage, quickLinks, section, updateContentBlockData, } from "../controllers/home.controller";
import { createSection, deleteSection, getSection, sectionsLists } from "../controllers/section.controller";
import { adminmenus, createM, createMenu, createNavItemPageM, deleteItem, getMenu, getMenuItem, menus, sidebarMenu, updateitem } from "../controllers/navigation.menu.controller";
import { deactive, getPageById, getPages, page, updatePage } from "../controllers/page.controller";
import { createFacility, deleteFacility, getFacility, getFacilitys, updateFacility } from "../controllers/facilities.controller";
import { footerCategory } from "../controllers/footer.category.controller";
import { footerContent, footerContentUpdate } from "../controllers/footer.content.controller";
import { createSpecialties, doctorSpecialist, fetchSpecialties } from "../controllers/specialties.controller";
import { addExpert, createDoctor, getDoctorById } from "../controllers/doctor.controller";


const route = express.Router();
// pm2 start ts-node -- -P tsconfig.json index.ts
/** guide router function */
export const AdminRoute = (router: express.Router): void => {
  router.use("/v1", route);

  // users
  route.post("/register",register);
  route.post("/login",login)

  // site settings
  route.get("/site/settings", settings)
  route.put("/site/settings",bulkUpdateSettingsHandler);
  route.delete("/site/settings/:id",deleteSettings)
  route.post("/site/settings/upload",uploadMedia.single("file") ,uploadFile)

  route.get("/header",header);

  // home
  route.get("/home",home)
  route.get("/admin/home",homeAdmin)
  route.get("/home/section/:sectionType",getSection);
  route.get("/home/quick-links",quickLinks);

  route.put("/home",homePage)
  
  // section api
  route.post("/home/section",createSection) // Create new section
  route.get("/home/sections/:pageId",sectionsLists);
  route.put("/home/section/:sectionId",section) // Update specific section
  route.delete("/home/section/:id",deleteSection);
  // route.delete("/home/section/{sectionId}", deleteSection) // Delete section (Admin only)

  // content block api
  route.put("/home/content-block/:sectionId", updateContentBlockData) // - Update content block
  route.post("/home/section/:sectionId/content-block", createContentBlockData) // - Create content block
  route.delete("/home/content-block/:contentBlockId",deleteContentBlock) // - Delete content block (Admin only)
  route.delete("/home/cotent-block/media/delete/:contentBlockMediaId",deleteContentBlockMedia)
  
  // menu api
  route.post("/navigation", createMenu)
  route.get("/navigation",getMenu)
  route.get('/navigation/menu',menus)
  route.get('/navigation/admin/menu',adminmenus)
  route.get('/navigation/admin/sidebar/menu',sidebarMenu)


  // menu-item api
  route.post("/navigation/menu",createM)
  // route.post("/navigation/item/category/menu",createNavItemPageM)
  route.get("/navigation/admin/menu/:id",getMenuItem)
  route.put("/navigation/menu/:id",updateitem)
  route.delete("/navigation/menu/:id",deleteItem)

  // pages
  route.post("/page",page)
  route.get("/page",getPages)
  route.get("/page/:pageId",getPageById)
  route.put("/page/:pageId",updatePage)
  route.delete("/page/:pageId",deactive)

  // Facilities
  route.post("/facility", createFacility);
  route.get("/facility", getFacilitys);
  route.get("/facility/:id", getFacility);
  route.put("/facility/id", updateFacility);
  route.delete("/facility/:id", deleteFacility);

  // Footer Api
  route.get("/footer/category", footerCategory)
  route.post("/footer/content", footerContent);
  route.put("/footer/content/:id", footerContentUpdate)

  // specialties Api
  route.get("/specialties", fetchSpecialties) // fetch all specialties
  route.post("/specialties", createSpecialties) // create new specialties
  
  // Doctor Api
  route.post("/doctor", createDoctor);
  route.get("/doctor/specialist", doctorSpecialist)
  route.post("/expert", addExpert)
  route.get("/doctor/:id", getDoctorById)




};
