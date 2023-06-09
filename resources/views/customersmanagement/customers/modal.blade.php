<div class="modal fade" id="modal-main" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center" id="modal-title"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="set-Model" class="form-horizontal">
            @csrf
            <input type="hidden" name="id" id="id">
            <div class="row g-3">
              <div class="col">
                <label>First Name</label>
                <input type="text" id="fname" name="fname" class="form-control">
              </div>
              <div class="col">
                <label>Middle Name</label>
                <input type="text" id="mname" name="mname" class="form-control">
              </div>
              <div class="col">
                <label>Last Name</label>
                <input type="text" id="lname" name="lname" class="form-control">
              </div>
            </div>
            <div class="row g-3">
              <div class="col">
                <label>Address</label>
                <input type="text" id="address" name="address" class="form-control">
              </div>
              <div class="col">
                <label>Contact</label>
                <input type="text" id="contact" name="contact" class="form-control">
              </div>
            </div>
        </form>
      </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary form-control" id="engrave" value="create-new">Save</button>
        </div>
    </div>
  </div>
</div>