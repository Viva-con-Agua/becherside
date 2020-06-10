const pluginSass = require("eleventy-plugin-sass");
const util = require('util');

module.exports = config =>  {
    
    config.addPlugin(pluginSass);
    config.setTemplateFormats("html,md,njk");

    config.addFilter('dump', obj => {
        return util.inspect(obj)
    });

    config.addFilter('fill', (obj, color) => {
        return console.log(obj, color);
    });
    
    config.addFilter('findByFileSlug', (collection, slug) => {
        const index = collection.findIndex(item => {
            return item['template']['fileSlugStr'] === slug; 
        });
        return collection[index];
    });

    config.addFilter('getPrev', (collection, slug) => {
        let index = collection.findIndex(item => {
            return item['template']['fileSlugStr'] === slug; 
        });
        
        if(index === 0) {
            return collection[collection.length - 1]
        } else {
            index--;
            return collection[index];
        }
    });

    config.addFilter('getNext', (collection, slug) => {
        let index = collection.findIndex(item => {
            return item['template']['fileSlugStr'] === slug; 
        });
        if(index === collection.length - 1) {
            return collection[0];
        } else {
            index++;
            return collection[index];
        }
    });

    config.addCollection("index", collection => {
        return collection.getFilteredByGlob("src/_content/index.md");
    });
    
    return {
        dir: {
            input: "src",
            output: "dist",
        },
        templateFormats: ["html","md", "njk"]
    }
}
