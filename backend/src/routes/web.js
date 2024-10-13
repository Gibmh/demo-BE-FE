// // import express from "express";
// // import HomeController from "../controllers/homeController";
// // import bookController from "../controllers/bookController";
// // let router = express.Router();

// // const {
// //   getHomePage,
// //   getAboutPage,
// //   getCrud,
// //   PostCrud,
// //   ReadCrud,
// //   getEditCrud,
// //   PutCrud,
// //   DeleteCrud,
// // } = HomeController;

// // const { handleCreate } = bookController;

// // let initWebroutes = (app) => {
// //   router.get("/", getHomePage);
// //   router.get("/about", getAboutPage);
// //   router.get("/crud", getCrud);

// //   router.post("/post-crud", PostCrud); // post data lên database
// //   router.get("/get-crud", ReadCrud); //Lấy data từ database
// //   router.get("/edit-crud", getEditCrud); // edit data
// //   router.post("/put-crud"); // put data đã edit lên database
// //   router.get("/delete-crud", DeleteCrud); // xoas data

// //   router.post("/api/CREATE", bookController.handleCreate);

// //   return app.use("/", router);
// // };

// // export default initWebroutes;
// import express from "express";
// import HomeController from "../controllers/homeController";
// import bookController from "../controllers/bookController";
// let router = express.Router();

// const {
//   getHomePage,
//   getAboutPage,
//   getCrud,
//   PostCrud,
//   ReadCrud,
//   getEditCrud,
//   PutCrud, // Make sure this is correctly imported
//   DeleteCrud,
//   ReadData,
// } = HomeController;

// const { handleCreate } = bookController;

// let initWebroutes = (app) => {

//   // router.get("/api/get-list", ReadData);

//   router.post("/api/CREATE", handleCreate); // No need to access it from bookController again

//   return app.use("/", router);
// };

// export default initWebroutes;
