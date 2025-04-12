<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassroomController extends Controller
{
    public function index(): Response
    {
        $classrooms = Classroom::all();
        return Inertia::render('Classrooms', [
            'classrooms' => $classrooms
        ]);
    }

    // Show create form
    public function create(): Response
    {
        return Inertia::render('Classrooms/Create');
    }

    // Store new classroom
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Classroom::create($validated);

        return redirect()->route('classrooms.index')->with('success', 'Classroom created successfully.');
    }

    // Show edit form
    public function edit(Classroom $classroom): Response
    {
        return Inertia::render('Classrooms/Edit', [
            'classroom' => $classroom
        ]);
    }

    // Update classroom
    public function update(Request $request, Classroom $classroom)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $classroom->update($validated);

        return redirect()->route('classrooms.index')->with('success', 'Classroom updated successfully.');
    }

    // Delete classroom
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();

        return redirect()->route('classrooms.index')->with('success', 'Classroom deleted successfully.');
    }
}
