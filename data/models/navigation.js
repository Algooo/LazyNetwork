/**
 * Created by alexa_000 on 02.03.14.
 */


define(['mongoose', '../schemas/navigation'], function (mongoose, navigationSchema) {

    var navigation = mongoose.model('navigation', navigationSchema);

    return navigation;
});
