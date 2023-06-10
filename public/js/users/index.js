import fetch from "../modules/fetch.js";

$("body").on("click", ".btn-find", async (e) =>
    state.show($(e.currentTarget).data("index"))
);
$("body").on("click", ".btn-delete", (e) =>
    state.destroy($(e.currentTarget).data("index"))
);

$("body").on("click", ".btn-approved", function (e) {
    updateStatusApprove($(e.currentTarget).data("id"));
});

$("#searchBar").keyup(function () {
    var value = $("#searchBar").val().toLowerCase();
    $("#table-main tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

function updateStatusApprove(id) {
    swal.fire({
        title: "Are you sure",
        text: "You Will Approve This User?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Disapprove it!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
        if (result.value == true) {
            let stat = {
                isApproved: 1,
            };

            $.ajax({
                type: "PUT",
                url: "api/users/" + id + "/updatestatus",
                data: stat, // serializes the form's elements.
                dataType: "json",
                encode: true,
                success: function (data) {
                    swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                        footer: "<a href>CleverTech</a>",
                    });
                    state.ask();
                },
            });
        } else {
            let stat = {
                isApproved: 0,
            };

            $.ajax({
                type: "PUT",
                url: "api/users/" + id + "/updatestatus",
                data: stat, // serializes the form's elements.
                dataType: "json",
                encode: true,
                success: function (data) {
                    state.ask();
                },
            });
        }
    });
}

const state = {
    /* [Table] */
    entity: {
        name: "user",
        attributes: [
            "roleName",
            "fullName",
            "address",
            "contact",
            "DOB",
            "email",
            "statusName",
        ],
        actions: {
            approved: ["fa fa-thumbs-up", "Approve", "warning"],
            find: ["fa fa-pencil-alt", "Edit", "info"],
            delete: ["fa fa-trash", "Delete", "danger"],
        },
        baseUrl: "api",
    },
    /* [Object Mapping] */
    models: [],
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
        fetch.option_list("role", "display_name");

        state.btnNew.addEventListener("click", state.create);
        state.btnNew.disabled = false;

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
        fetch.showModal("roles");
    },
    show: (i) => {
        state.activeIndex = i;
        state.btnEngrave.innerHTML = "Update";

        state.btnEngrave.removeEventListener("click", state.store);
        state.btnEngrave.addEventListener("click", state.update);
        state.btnEngrave.setAttribute("data-id", state.models[i].id);
        fetch.showOnModal(state.models[i]);
    },
    store: async (e) => {
        e.preventDefault();
        let params = $("#set-Model").serializeArray();
        let model = await fetch.store(state.entity, params);
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
