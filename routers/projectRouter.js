const express = require("express");
const router = express.Router();
const _projectOps = require("../data/projects");

router.get("/", async (req, res) => {
    // Extract 'q' from the URL query string
    const searchTerm = req.query.q;

    // Pass it to our data layer
    const projects = await _projectOps.getProjectList(searchTerm);

    res.render("project-list", { projects, searchTerm });
});

router.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    const project = await _projectOps.getProjectBySlug(slug);

    if (project) {
        res.render("project-detail", { project });
    } else {
        res.status(404).render("404");
    }
});

module.exports = router;