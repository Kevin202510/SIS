@extends('layouts.master')

@section('content')
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <h5>Roles Management</h5>
                    <div>
                        <input class="form-control" placeholder="Search" id="searchBar">
                    </div>
                    <div class="text-right" style="margin-bottom:15px;">
                        <a href="javascript:void(0)" class="btn btn-success my-2 my-sm-0" id="btn-new"><span class="fa fa-plus"></span></a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Display Name</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="table-main"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@include('usersmanagement/roles/modal')
@endsection

@section('javascript')
<script type="module" src="{{ asset('js/roles/index.js') }}"></script>
@endsection
