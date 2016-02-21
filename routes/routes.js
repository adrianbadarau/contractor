/**
 * Created by adrianbadarau on 20/02/16.
 */

Router.configure({
    layoutTemplate: 'main'
});

Router.route('home', {
    path: "/",
    template: 'home',
    subscriptions: function () {
        this.subscribe('contracts');
    },
    data: function () {
    }
});

Router.route('about', {
    path: "/about",
    template: 'about'
});

Router.route('contact', {
    path: "/contact",
    template: 'contact'
});

Router.route('sign_in', {
    path: 'sign-in',
    template: 'sign_in'
});

Router.route('contracts_index', {
    path: "/contracts/",
    template: "contracts_index",
    subscriptions: function () {
        this.subscribe('contracts')
    },
    data: function () {
        return {
            contracts: Contracts.find({})
        }
    }
});

Router.route('contracts_create', {
    path: '/contracts/create',
    template: 'contracts_manage',
    subscriptions: function () {
        this.subscribe('files');
    },
    data: function () {
        return {
            title: "Create new Contract",
            type: "create"
        }
    }
});

Router.route('contracts_edit', {
    path: "/contracts/:_id/edit",
    template: 'contracts_manage',
    subscriptions: function () {
        this.subscribe('contracts').wait();
        this.subscribe('files').wait();
    },
    data: function () {
        var contract = Contracts.findOne({_id: this.params._id});
        var file = Files.findOne({_id: contract.file_id});
        return {
            title: "Edit Contract",
            type: "edit",
            contract: contract,
            file: file
        }
    }
});

Router.route('contract_templates', {
    path: '/contract_templates/',
    template: 'contract_templates_index',
    subscriptions: function () {
        this.subscribe('contract_templates').wait();
    },
    data: function () {
        return {
            contract_templates: ContractTemplates.find({})
        }
    }
});

Router.route('contract_templates_create', {
    path: "/contract_templates/create",
    template: "contract_templates_manage",
    data: function () {
        return {
            title: 'Create New Contract Template',
            type: 'create'
        }
    }
});

Router.route('contract_templates_edit',{
    name:'contract_templates_edit',
    path:"/contract_templates/:_id/edit",
    template:'contract_templates_manage',
    subscriptions: function () {
        this.subscribe('contract_templates').wait();
    },
    data: function () {
        return{
            title: 'Edit Contract Template',
            type: 'edit',
            contract_template: ContractTemplates.findOne({_id: this.params._id})
        }
    }
});