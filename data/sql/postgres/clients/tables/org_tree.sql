create table if not exists org_tree (
    client_id bigint not null,
    org_id bigint not null,
    parent_org_id bigint not null,
    constraint pk_org_tree primary key (client_id, org_id, parent_org_id),
    constraint fk_org_tree_1 foreign key (client_id) references clients.clients(id)
        on delete restrict on update restrict,
    constraint fk_org_tree_2 foreign key (org_id) references clients.organizations(id)
        on delete restrict on update restrict,
    constraint fk_org_tree_3 foreign key (parent_org_id) references clients.organizations(id)
        on delete restrict on update restrict
);