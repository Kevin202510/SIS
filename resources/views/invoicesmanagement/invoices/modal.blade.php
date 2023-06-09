<div class="modal fade" id="modal-main" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-center" id="modal-title"></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="set-Model" class="form-horizontal">
            @csrf
            <input type="hidden" name="id" id="id">
            <center>
            <div class="d-flex justify-content-between">
              <div class="col">
                <div class="input-group"  style="width: 70%;">
                  <div class="input-group-text">Invoice Number</div>
                  <input type="text" value="{{$invoice_number}}" class="form-control" placeholder="invoice_number" aria-label="invoice_number" name="invoice_number" id="invoice_number" readonly>
                </div>  
              </div>
              <div class="col">
                <div class="input-group" style="width: 80%;">
                  <div class="input-group-text">Invoice Date</div>
                    <input type="text" value="{{now()->format('Y-m-d')}}" class="form-control" placeholder="invoice_date" aria-label="invoice_date" name="invoice_date" id="invoice_date" readonly>
                  </div>
                </div>
            </div>
            </center>
            <center>
            <div class="d-flex justify-content-between" style="margin-top:15px;">
              <div class="col"></div>
              <div class="col">
                <div class="input-group" style="width: 80%;">
                  <div class="input-group-text">Customer Name</div>
                    <select name="customer_id" id="customer-id" class="form-control customer-id" required></select>
                  </div>
                </div>
            </div>
            </center>
            <div class="card"  style="margin-top:20px;">
              <div class="card-header">
                <div class="text-right" style="margin-bottom:15px;">
                    <a href="javascript:void(0)" class="btn btn-success my-2 my-sm-0" id="btn-new-product"><span class="fa fa-plus"></span></a>
                </div>
              </div>
              <div class="card-body">
                <center>
                  <div class="table-responsive">
                      <table class="table">
                          <thead>
                              <tr>
                              <th scope="col">Product Name</th>
                              <th scope="col">Price</th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Sub Total</th>
                              </tr>
                          </thead>
                          <tbody id="table-mains"></tbody>
                      </table>
                  </div>
                </center>
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