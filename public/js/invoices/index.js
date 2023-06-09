import fetch from "../modules/fetch.js";
/**
 *-----------------------------------------------
 * @param Model entity.name
 * @param Attributes entity.attribute(show on table)
 * @param Button attribute.actions.key
 * @param btn_attribute key:['icon','tooltip','color']
 * @param Base_URL entiry.url
 * @return GUI BREAD
 */

$("body").on("click", ".btn-find", async (e) =>
    state.show($(e.currentTarget).data("index"))
);
$("body").on("click", ".btn-delete", (e) =>
    state.destroy($(e.currentTarget).data("index"))
);

$("body").on("click", ".btn-view", async (e) =>
    state.view($(e.currentTarget).data("index"))
);

$("#customer-id").on("change", function () {
    if ($("#customer-id").val() == 0) {
        $("#modal-main-2").modal("show");
    }
});

$("#engrave2").on("click", function (e) {
    e.preventDefault();
    let params = $("#set-Model2").serializeArray();
    $.ajax({
        type: "POST",
        url: "api/customers/save",
        data: params,
        dataType: "json",
        encode: true,
        success: function (data) {
            $("#modal-main-2").modal("hide");
            $("#customer-id").empty();
            fetch.option_list("customer", "fullName");
        },
    });
});

$("#btn-new-product").on("click", function () {
    var index = $("#table-mains tr").length;
    let tablerow = $("<tr>");
    $("<td>")
        .append(
            $("<input>", {
                type: "text",
                class: "form-control",
                id: `product-name-${index}`,
            })
        )
        .appendTo(tablerow);
    $("<td>")
        .append(
            $("<input>", {
                type: "number",
                class: "form-control",
                id: `product-price-${index}`,
                "data-id": index,
            })
        )
        .appendTo(tablerow);
    $("<td>")
        .append(
            $("<input>", {
                type: "number",
                class: "form-control",
                id: "product-quantity",
                "data-id": index,
            })
        )
        .appendTo(tablerow);
    $("<td>")
        .append(
            $("<input>", {
                type: "text",
                class: "form-control",
                id: `subtotal-${index}`,
                readonly: true,
            })
        )
        .appendTo(tablerow);
    $("#table-mains").append(tablerow);
});

let arrayData = [];

$(".modal").on("change", "#product-quantity", function (e) {
    let stotal =
        parseFloat($("#product-price-" + $(e.currentTarget).data("id")).val()) *
        parseFloat($(e.currentTarget).val());
    $("#subtotal-" + $(e.currentTarget).data("id")).val(stotal);

    arrayData.push({
        product_name: $("#product-name-" + $(e.currentTarget).data("id")).val(),
        product_quantity: $(e.currentTarget).val(),
        product_price: $(
            "#product-price-" + $(e.currentTarget).data("id")
        ).val(),
        product_sub_total: stotal,
    });
});

const state = {
    /* [Table] */
    entity: {
        name: "invoice",
        attributes: ["invoice_number", "invoice_date", "fullName"],
        actions: {
            view: ["fa fa-pencil-alt", "Edit", "info"],
            find: ["fa fa-pencil-alt", "Edit", "info"],
            delete: ["fa fa-trash", "Delete", "danger"],
        },
        baseUrl: "api",
    },
    /* [Object Mapping] */
    models: [],
    /* [Tag object] */
    // btnKey: document.getElementById("key"),
    // btnLook: document.getElementById("look"),
    btnNew: document.getElementById("btn-new"),
    Userid: document.getElementById("id"),
    modalTitle: document.getElementById("modal-title"),
    btnEngrave: document.getElementById("engrave"),
    activeIndex: 0,
    btnUpdate: null,
    btnDelete: null,
    /* [initialized] */
    init: () => {
        // Attach listeners
        // state.btnKey.addEventListener("keyup", state.ask);
        // state.btnKey.disabled = false;
        // state.btnLook.addEventListener("click", state.ask);
        // state.btnLook.disabled = false;
        state.btnNew.addEventListener("click", state.create);
        state.btnNew.disabled = false;
        fetch.option_list("customer", "fullName");
        // fetch.showModal("roles");

        state.ask();
    },
    /* [ACTIONS] */
    ask: async () => {
        state.models = await fetch.translate(state.entity);
        if (state.models) {
            state.models.forEach((model) => fetch.writer(state.entity, model));
        }
    },
    create: () => {
        state.btnEngrave.innerHTML = "Save";
        state.btnEngrave.removeEventListener("click", state.update);
        state.btnEngrave.addEventListener("click", state.store);
        fetch.showModal("Invoices");
    },
    show: (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.update);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.showOnModal(state.models[i]);
    },
    view: (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Close";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.closethis);
        fetch.viewOnModal(state.models[i]);
    },
    store: async (e) => {
        e.preventDefault();
        let formdata = {
            customer_id: $("#customer-id").val(),
            invoice_number: $("#invoice_number").val(),
            invoice_date: $("#invoice_date").val(),
            product_detail: arrayData,
        };
        // let params = $("#set-Model").serializeArray();
        let model = await fetch.store(state.entity, formdata);
        if (model) {
            state.models.push(model);
            fetch.writer(state.entity, model);
            $("#modal-main").modal("hide");
        }
    },
    update: async () => {
        let params = $("#set-Model").serializeArray();
        let pk = state.btnEngrave.getAttribute("data-id");
        let model = await fetch.update(state.entity, pk, params);

        if (model) {
            //    console.log(model)
            state.models[state.activeIndex] = model;
            fetch.writer(state.entity, model);

            $("#modal-main").modal("hide");
        }
    },
    destroy: async (i) => {
        let pkey = state.models[i].id;
        let ans = await fetch.destroy(state.entity, pkey);
        if (ans) {
            state.models.splice(i, 1);
        }
    },
};

window.addEventListener("load", state.init);
