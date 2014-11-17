/**
 * Created by alexa_000 on 02.03.14.
 */


define(['mongoose'], function (mongoose) {

    var navigationItemSchema = new mongoose.Schema();
    navigationItemSchema.add({
        key: String,
        name: String,
        link: String,
        active: Boolean,
        icon: String,
        childMenuItems: [navigationItemSchema],
        showChildItems: Boolean
    });

    var navigationSchema = new mongoose.Schema();
    navigationSchema.add({
        key: String,
        navbarCollapsed: Boolean,
        navbarMenuItems: [navigationItemSchema],
    });

    return navigationSchema;
});
