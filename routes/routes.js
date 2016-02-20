/**
 * Created by adrianbadarau on 20/02/16.
 */

Router.configure({
    layoutTemplate:'main'
});

Router.route('home',{
    path:"/",
    template:'home',
    data:function(){

    }
});

Router.route('about',{
    path:"/about",
    template:'about'
});

Router.route('contact',{
    path:"/contact",
    template:'contact'
});