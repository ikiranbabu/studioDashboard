import {Component, Input, ViewChild} from "@angular/core";
import {AdnetCustomerModel} from "../../../../adnet/AdnetCustomerModel";
import {AdnetPairModel} from "../../../../adnet/AdnetPairModel";
import {List} from "immutable";
import {AdnetPackageModel} from "../../../../adnet/AdnetPackageModel";
import {AppStore} from "angular2-redux-util";
import {SimpleList, ISimpleListItem} from "../../../simplelist/Simplelist";

@Component({
    selector: 'AdnetNetworkPackageEditor',
    moduleId: __moduleName,
    styleUrls: ['AdnetNetworkPackageEditor.css'],
    templateUrl: 'AdnetNetworkPackageEditor.html'
})

export class AdnetNetworkPackageEditor {

    constructor(private appStore: AppStore) {
    }

    ngOnInit() {
        this.packages = this.appStore.getState().adnet.getIn(['packages']) || {};
        this.unsub = this.appStore.sub((i_adPackages: List<AdnetPackageModel>) => {
            this.packages = i_adPackages;
            this.filterPackages();
        }, 'adnet.packages');
        this.filterPackages();
    }

    @ViewChild(SimpleList)
    simpleList:SimpleList;

    @Input()
    set setPairOutgoing(i_setPairOutgoing: boolean) {
        this.pairOutgoing = i_setPairOutgoing;
        if (this.pairOutgoing == true)
            this.filterPackages();
    }

    @Input()
    set setAdnetCustomerModel(i_adnetCustomerModel: AdnetCustomerModel) {
        this.adnetCustomerModel = i_adnetCustomerModel;
        this.filterPackages();
    }

    @Input()
    setAdnetPairModels: List<AdnetPairModel>

    private unsub: Function;
    private adnetCustomerModel: AdnetCustomerModel;
    private packages: List<AdnetPackageModel>
    private packagesFiltered: List<AdnetPackageModel>
    private pairOutgoing: boolean;
    public selectedAdnetPackageModel:AdnetPackageModel;

    private onAdd(event) {

    }

    private onRemove(event) {

    }

    private filterPackages() {
        if (!this.packages || !this.adnetCustomerModel)
            return;
        this.packagesFiltered = List<AdnetPackageModel>();
        this.packages.forEach((i_package: AdnetPackageModel) => {
            if (i_package.getCustomerId() == this.adnetCustomerModel.getId())
                this.packagesFiltered = this.packagesFiltered.push(i_package);
        })
    }

    private getId(i_adnetPackageModel: AdnetPackageModel) {
        if (!i_adnetPackageModel)
            return;
        return i_adnetPackageModel.getId();
    }

    private onSelecting(event) {
        var orderSelected:ISimpleListItem = this.simpleList.getSelected();
        this.selectedAdnetPackageModel = orderSelected.item;
    }

    private getName(i_adnetPackageModel: AdnetPackageModel) {
        if (i_adnetPackageModel)
            return i_adnetPackageModel.getName();
    }

    private ngOnDestroy() {
        this.unsub();
    }
}