<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">SIS</div>
    </a>
    <hr class="sidebar-divider">
    <div class="sidebar-heading">
        Users Management
    </div>
    <li class="nav-item">
        <a class="nav-link" href="{{ route('Roles')}}">
            <i class="fas fa-lock"></i>
            <span>Roles</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
            aria-expanded="true" aria-controls="collapseUtilities">
            <i class="fas fa-fw fa-users"></i>
            <span>Users</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar">
            <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">Users Management</h6>
                <a class="collapse-item" href="{{ route('Users')}}">Active Users</a>
                <a class="collapse-item" href="{{ route('Archive Users')}}">Archieve Users</a>
            </div>
        </div>
    </li>
    <hr class="sidebar-divider">
    <div class="sidebar-heading">
        Customers Management
    </div>
    <li class="nav-item">
        <a class="nav-link" href="{{ route('Customers')}}">
            <i class="fas fa-users"></i>
            <span>Customers</span></a>
    </li>
    <hr class="sidebar-divider">
    <div class="sidebar-heading">
        Invoice Management
    </div>
    <li class="nav-item">
        <a class="nav-link" href="{{ route('Invoices')}}">
            <i class="fas fa-file-invoice"></i>
            <span>Invoice</span></a>
    </li>
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>