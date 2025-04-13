<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'create-users']);
        Permission::create(['name' => 'edit-users']);
        Permission::create(['name' => 'delete-users']);

        Permission::create(['name' => 'create-classrooms']);
        Permission::create(['name' => 'edit-classrooms']);
        Permission::create(['name' => 'delete-classrooms']);

        Permission::create(['name' => 'create-subjects']);
        Permission::create(['name' => 'edit-subjects']);
        Permission::create(['name' => 'delete-subjects']);

        $adminRole = Role::create(['name' => 'Admin']);
        $teacherRole = Role::create(['name' => 'Teacher']);
        $studentRole = Role::create(['name' => 'Student']);

        $adminRole->givePermissionTo([
            'create-users',
            'edit-users',
            'delete-users',
            'create-classrooms',
            'edit-classrooms',
            'delete-classrooms',
            'create-subjects',
            'edit-subjects',
            'delete-subjects',
        ]);

        $teacherRole->givePermissionTo([

        ]);

        $studentRole->givePermissionTo([

        ]);

    }
}
