<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    public function index(): Response
    {
        $subjects = Subject::all();
        return Inertia::render('Subjects', [
            'subjects' => $subjects
        ]);
    }

    // Show create form
    public function create(): Response
    {
        return Inertia::render('Subjects/Create');
    }

    // Store new subject
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Subject::create($validated);

        return redirect()->route('subjects.index')->with('success', 'Subject created successfully.');
    }

    // Show edit form
    public function edit(Subject $subject): Response
    {
        return Inertia::render('Subjects/Edit', [
            'subject' => $subject
        ]);
    }

    // Update classroom
    public function update(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $subject->update($validated);

        return redirect()->route('subjects.index')->with('success', 'Subject updated successfully.');
    }

    // Delete classroom
    public function destroy(Subject $subject)
    {
        $subject->delete();

        return redirect()->route('subjects.index')->with('success', 'Subject deleted successfully.');
    }
}
