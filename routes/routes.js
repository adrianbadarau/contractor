/**
 * Created by adrianbadarau on 20/02/16.
 */

Router.configure({
    layoutTemplate:'main'
});

Router.route('home',{
    path:"/",
    template:'home',
    subscriptions: function () {
        this.subscribe('contracts');
    },
    data: function () {
        var contracts = Contracts.find();
        var templateData = {
            contracts : contracts
        };
        return templateData;
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

Router.route('sign_in',{
    path:'sign-in',
    template: 'sign_in'
});

Router.route('contracts_create',{
    path:'/contracts/',
    template:'contracts_manage',
    subscriptions: function () {
        this.subscribe('files');
    },
    data: function () {
        return {
            title:"Create new Contract",
            type:"create"
        }
    }
});