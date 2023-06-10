import fetch from "../modules/fetch.js";
let arrayData = [];

$("body").on("click", ".btn-find", async (e) =>
    state.show($(e.currentTarget).data("index"))
);
$("body").on("click", ".btn-delete", (e) =>
    state.destroy($(e.currentTarget).data("index"))
);

$("body").on("click", ".btn-view", async (e) =>
    state.view($(e.currentTarget).data("index"))
);

$("#searchBar").keyup(function () {
    var value = $("#searchBar").val().toLowerCase();
    $("#table-main tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

$("#customer-id").on("change", function () {
    if ($("#customer-id").val() == 0) {
        $("#modal-main-2").modal("show");
    }
});

$("#modal-main").on("hidden.bs.modal", function () {
    $("#table-mains").empty();
    arrayData.length = 0;
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
                class: `form-control quantity-${index}`,
                id: "product-quantity",
                "data-id": index,
            })
        )
        .appendTo(tablerow);
    $("<td>")
        .append(
            $("<input>", {
                type: "number",
                class: `form-control price-list`,
                id: `product-price-${index}`,
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

$(".modal").on("focusout", "#product-quantity", function (e) {
    if ($("#product-price-" + $(e.currentTarget).data("id")).val() != "") {
        let stotal =
            parseFloat(
                $("#product-price-" + $(e.currentTarget).data("id")).val()
            ) * parseFloat($(e.currentTarget).val());
        $("#subtotal-" + $(e.currentTarget).data("id")).val(stotal);

        if (arrayData.length == 0) {
            arrayData.push({
                product_id: $(e.currentTarget).data("id"),
                product_name: $(
                    "#product-name-" + $(e.currentTarget).data("id")
                ).val(),
                product_quantity: $(e.currentTarget).val(),
                product_price: $(
                    "#product-price-" + $(e.currentTarget).data("id")
                ).val(),
                product_sub_total: stotal,
            });
        } else {
            var found = arrayData.some((el) => {
                return el.product_id == $(e.currentTarget).data("id");
            });
            if (!found) {
                arrayData.push({
                    product_id: $(e.currentTarget).data("id"),
                    product_name: $(
                        "#product-name-" + $(e.currentTarget).data("id")
                    ).val(),
                    product_quantity: $(e.currentTarget).val(),
                    product_price: $(
                        "#product-price-" + $(e.currentTarget).data("id")
                    ).val(),
                    product_sub_total: stotal,
                });
            } else {
                $.each(arrayData, function (i, obj) {
                    if (obj.product_id == $(e.currentTarget).data("id")) {
                        obj.product_quantity = $(e.currentTarget).val();
                        obj.product_sub_total =
                            parseFloat(obj.product_price) *
                            parseFloat($(e.currentTarget).val());
                        return false;
                    }
                });
            }
        }
    }

    var genTotal = 0;

    arrayData.forEach((data) => {
        genTotal += parseFloat(data.product_sub_total);
    });
    $("#generalTotal").text(genTotal);
});

$(".modal").on("focusout", ".price-list", function (e) {
    if ($(".quantity-" + $(e.currentTarget).data("id")).val() != "") {
        let stotal =
            parseFloat($(".quantity-" + $(e.currentTarget).data("id")).val()) *
            parseFloat($(e.currentTarget).val());
        $("#subtotal-" + $(e.currentTarget).data("id")).val(stotal);

        if (arrayData.length == 0) {
            arrayData.push({
                product_id: $(e.currentTarget).data("id"),
                product_name: $(
                    "#product-name-" + $(e.currentTarget).data("id")
                ).val(),
                product_quantity: $(
                    ".quantity-" + $(e.currentTarget).data("id")
                ).val(),
                product_price: $(e.currentTarget).val(),
                product_sub_total: stotal,
            });
        } else {
            var found = arrayData.some((el) => {
                return el.product_id == $(e.currentTarget).data("id");
            });
            if (!found) {
                arrayData.push({
                    product_id: $(e.currentTarget).data("id"),
                    product_name: $(
                        "#product-name-" + $(e.currentTarget).data("id")
                    ).val(),
                    product_quantity: $(
                        ".quantity-" + $(e.currentTarget).data("id")
                    ).val(),
                    product_price: $(e.currentTarget).val(),
                    product_sub_total: stotal,
                });
            } else {
                $.each(arrayData, function (i, obj) {
                    if (obj.product_id == $(e.currentTarget).data("id")) {
                        obj.product_price = $(e.currentTarget).val();
                        obj.product_sub_total =
                            parseFloat($(e.currentTarget).val()) *
                            parseFloat(obj.product_quantity);
                        return false;
                    }
                });
            }
        }
    }

    var genTotal = 0;

    arrayData.forEach((data) => {
        genTotal += parseFloat(data.product_sub_total);
    });
    $("#generalTotal").text(genTotal);
});

const state = {
    entity: {
        name: "invoice",
        attributes: ["invoice_number", "invoice_date", "fullName"],
        actions: {
            find: ["fa fa-pencil-alt", "Edit", "info"],
            delete: ["fa fa-trash", "Delete", "danger"],
        },
        baseUrl: "api",
    },
    models: [],
    btnNew: document.getElementById("btn-new"),
    Userid: document.getElementById("id"),
    modalTitle: document.getElementById("modal-title"),
    btnEngrave: document.getElementById("engrave"),
    activeIndex: 0,
    btnUpdate: null,
    btnDelete: null,
    init: () => {
        state.btnNew.addEventListener("click", state.create);
        state.btnNew.disabled = false;
        fetch.option_list("customer", "fullName");
        state.ask();
    },
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
        $("#generalTotal").val(0);
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.update);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.showOnModal(state.models[i]);

        var index = $("#table-mains tr").length;

        let dataarray = state.models[i].product_detail;
        dataarray.forEach((dataA, ins) => {
            arrayData.push(dataA);
            let tablerow = $("<tr>");
            $("<td>")
                .append(
                    $("<input>", {
                        type: "text",
                        value: dataA.product_name,
                        class: "form-control",
                        id: `product-name-${ins}`,
                    })
                )
                .appendTo(tablerow);
            $("<td>")
                .append(
                    $("<input>", {
                        type: "number",
                        class: `form-control quantity-${ins}`,
                        id: "product-quantity",
                        value: dataA.product_quantity,
                        "data-id": ins,
                    })
                )
                .appendTo(tablerow);
            $("<td>")
                .append(
                    $("<input>", {
                        type: "number",
                        class: `form-control price-list`,
                        value: dataA.product_price,
                        id: `product-price-${ins}`,
                        "data-id": ins,
                    })
                )
                .appendTo(tablerow);
            $("<td>")
                .append(
                    $("<input>", {
                        type: "text",
                        class: "form-control",
                        value: dataA.product_sub_total,
                        id: `subtotal-${ins}`,
                        readonly: true,
                    })
                )
                .appendTo(tablerow);
            $("#table-mains").append(tablerow);
        });
        var genTotal = 0;

        arrayData.forEach((data) => {
            genTotal += parseFloat(data.product_sub_total);
        });
        $("#generalTotal").text(genTotal);
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
        let model = await fetch.store(state.entity, formdata);
        if (model) {
            state.models.push(model);
            fetch.writer(state.entity, model);
            $("#modal-main").modal("hide");
        }
    },
    update: async () => {
        let formdata = {
            customer_id: $("#customer-id").val(),
            invoice_number: $("#invoice_number").val(),
            invoice_date: $("#invoice_date").val(),
            product_detail: arrayData,
        };
        let pk = state.btnEngrave.getAttribute("data-id");
        let model = await fetch.update(state.entity, pk, formdata);

        if (model) {
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
