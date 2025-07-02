import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import IdeaEditor from './IdeaEditor';
import { Project, Idea, Attachment } from '@/types'; // Adjust path
import * as localStorageService from '@/services/localStorageService'; // Adjust path
import { IdeaBoilerplate } from '@/services/localStorageService'; // Correct import for IdeaBoilerplate
import * as fileService from '@/services/fileService'; // Adjust path

// Mock services
jest.mock('@/services/localStorageService', () => ({
  isAiEnabled: jest.fn<() => boolean>(() => true),
  generateIdeaBoilerplate: jest.fn<() => Promise<localStorageService.IdeaBoilerplate>>(), // Use namespace if ambiguous
  summarizeIdea: jest.fn<() => Promise<string>>(),
  addIdeaToProject: jest.fn<() => void>(),
  updateIdeaInProject: jest.fn<() => void>(),
  getProjectById: jest.fn<() => Project | undefined>(),
}));
jest.mock('@/services/fileService', () => ({
  exportIdea: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  readFileAsText: jest.fn<() => Promise<string>>().mockResolvedValue('mock text content'),
  readFileAsBase64: jest
    .fn<() => Promise<string>>()
    .mockResolvedValue('data:image/png;base64,mockbase64'),
  sanitizeFilename: jest.fn((name: string) => name.replace(/[^a-zA-Z0-9.]/g, '_')),
  base64ToBlob: jest.fn().mockReturnValue(new Blob()),
}));
jest.mock(
  './Button',
  () =>
    function ({ children, ...props }: any) {
      return <button {...props}>{children}</button>;
    }
);
jest.mock(
  './TextInput',
  () =>
    function ({ label, name, value, onChange, helpText, ...props }: any) {
      return (
        <label>
          {label}
          {helpText && <span title={helpText}>?</span>}
          <input name={name} value={value} onChange={onChange} {...props} />
        </label>
      );
    }
);
jest.mock(
  './TextArea',
  () =>
    function ({ label, name, value, onChange, helpText, ...props }: any) {
      return (
        <label>
          {label}
          {helpText && <span title={helpText}>?</span>}
          <textarea name={name} value={value} onChange={onChange} {...props} />
        </label>
      );
    }
);

const mockAddNotification = jest.fn();
const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();

const sampleProject: Project = {
  id: 'proj1',
  name: 'Test Project',
  ideas: [],
  attachments: [],
  createdAt: '2023-01-01T00:00:00.000Z',
};
const sampleIdeaToEdit: Idea = {
  id: 'idea1',
  title: 'Editable Idea',
  problemSolved: 'A problem',
  coreSolution: 'A solution',
  keyFeatures: 'Feature 1',
  targetAudience: 'Users',
  inspirationNotes: 'Some notes',
  attachments: [
    {
      id: 'att1',
      name: 'logo.png',
      type: 'image',
      mimeType: 'image/png',
      content: 'data:image/png;base64,abc',
      size: 123,
    },
    {
      id: 'att2',
      name: 'README.md',
      type: 'text',
      mimeType: 'text/markdown',
      content: '# Readme',
      size: 8,
    },
    {
      id: 'att3',
      name: 'archive.zip',
      type: 'other',
      mimeType: 'application/zip',
      content: '',
      size: 0,
    },
  ],
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
};

describe('IdeaEditor Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (localStorageService.getProjectById as jest.Mock<() => Project | undefined>).mockReturnValue(
      sampleProject
    );
  });

  const renderEditor = (ideaToEdit: Idea | null) => {
    render(
      <IdeaEditor
        project={sampleProject}
        ideaToEdit={ideaToEdit}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        addNotification={mockAddNotification}
      />
    );
  };

  test('renders in "New Blueprint" mode when ideaToEdit is null', () => {
    renderEditor(null);
    expect(screen.getByText(/Forge New Blueprint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blueprint Title\*/i)).toHaveValue('');
  });

  test('renders in "Edit Blueprint" mode with idea data when ideaToEdit is provided', () => {
    renderEditor(sampleIdeaToEdit);
    expect(screen.getByText(/Refine Blueprint/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blueprint Title\*/i)).toHaveValue(sampleIdeaToEdit.title);
    expect(screen.getByLabelText(/Problem Solved/i)).toHaveValue(sampleIdeaToEdit.problemSolved);
  });

  test('updates input fields on change', () => {
    renderEditor(null);
    const titleInput = screen.getByLabelText(/Blueprint Title\*/i) as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    expect(titleInput.value).toBe('New Title');
  });

  test('calls onSave with correct data for a new idea', () => {
    renderEditor(null);
    fireEvent.change(screen.getByLabelText(/Blueprint Title\*/i), {
      target: { value: 'Final Title' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save Blueprint/i }));

    expect(localStorageService.addIdeaToProject).toHaveBeenCalledWith(
      sampleProject.id,
      expect.objectContaining({ title: 'Final Title' })
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      'Blueprint "Final Title" forged and filed.',
      'success'
    );
    expect(mockOnSave).toHaveBeenCalled();
  });

  test('calls onSave with correct data for an existing idea', () => {
    renderEditor(sampleIdeaToEdit);
    fireEvent.change(screen.getByLabelText(/Problem Solved/i), {
      target: { value: 'Updated Problem' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Save Blueprint/i }));

    expect(localStorageService.updateIdeaInProject).toHaveBeenCalledWith(
      sampleProject.id,
      expect.objectContaining({ id: sampleIdeaToEdit.id, problemSolved: 'Updated Problem' })
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Blueprint "${sampleIdeaToEdit.title}" forged and filed.`,
      'success'
    );
    expect(mockOnSave).toHaveBeenCalled();
  });

  test('shows error if title is empty on save', () => {
    renderEditor(null);
    fireEvent.click(screen.getByRole('button', { name: /Save Blueprint/i }));
    expect(mockAddNotification).toHaveBeenCalledWith(
      'A blueprint needs a name to echo in the cosmos. Title, please!',
      'error'
    );
    expect(localStorageService.addIdeaToProject).not.toHaveBeenCalled();
  });

  test('calls onCancel when cancel button is clicked', () => {
    renderEditor(sampleIdeaToEdit);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('calls exportIdea when "Export Blueprint" button is clicked for an existing idea', async () => {
    renderEditor(sampleIdeaToEdit);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Export Blueprint/i }));
    });
    expect(fileService.exportIdea).toHaveBeenCalledWith(
      expect.objectContaining({ id: sampleIdeaToEdit.id })
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Transmitting Blueprint "${sampleIdeaToEdit.title}" beyond the forge...`,
      'success'
    );
  });

  test('AI boilerplate generation button interaction', async () => {
    (
      localStorageService.generateIdeaBoilerplate as jest.Mock<() => Promise<IdeaBoilerplate>>
    ).mockResolvedValueOnce({
      problemSolved: 'Generated Problem',
      coreSolution: 'Generated Solution',
      keyFeatures: '',
      targetAudience: '',
    });
    renderEditor(null);
    fireEvent.change(screen.getByLabelText(/Blueprint Title\*/i), {
      target: { value: 'AI Test Title' },
    });
    // The button is an icon button, target it by title or a more specific role if possible
    fireEvent.click(screen.getByTitle(/Summon Cosmic Muse/i));

    await waitFor(() => {
      expect(localStorageService.generateIdeaBoilerplate).toHaveBeenCalledWith('AI Test Title');
    });
    expect(screen.getByLabelText(/Problem Solved/i)).toHaveValue('Generated Problem');
    expect(mockAddNotification).toHaveBeenCalledWith(
      'The Cosmic Muse has whispered some starting points!',
      'success'
    );
  });

  test('AI summarize notes button interaction', async () => {
    (localStorageService.summarizeIdea as jest.Mock<() => Promise<string>>).mockResolvedValueOnce(
      'AI Summary of notes.'
    );
    renderEditor(null);
    const notesTextArea = screen.getByPlaceholderText(/Sketch your constellations here/i);
    fireEvent.change(notesTextArea, { target: { value: 'Some notes to summarize.' } });
    fireEvent.click(screen.getByTitle(/Consult AI Oracle/i));

    await waitFor(() => {
      expect(localStorageService.summarizeIdea).toHaveBeenCalledWith(
        expect.objectContaining({
          inspirationNotes: 'Some notes to summarize.',
        })
      );
    });
    expect(notesTextArea).toHaveValue(
      "Some notes to summarize.\n\n--- AI Oracle's Distillation ---\nAI Summary of notes."
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      'The AI Oracle has distilled your thoughts!',
      'success'
    );
  });

  test('handles file drop and processes attachments', async () => {
    renderEditor(null);
    const dropzone = screen
      .getByPlaceholderText(/Sketch your constellations here/i)
      .closest('div[class*="md:col-span-3"]');
    if (!dropzone) throw new Error('Dropzone not found');

    const mockFile = new File(['mock content'], 'test.png', { type: 'image/png' });
    const dataTransfer = { files: [mockFile], types: ['Files'] };

    await act(async () => {
      fireEvent.dragOver(dropzone, { dataTransfer }); // Simulate drag over
      fireEvent.drop(dropzone, { dataTransfer });
    });

    await waitFor(() => {
      expect(fileService.readFileAsBase64).toHaveBeenCalledWith(mockFile);
    });
    expect(mockAddNotification).toHaveBeenCalledWith('Materializing your artifacts...', 'info');
  });

  test('AI boilerplate generation handles AI offline/error', async () => {
    (localStorageService.generateIdeaBoilerplate as jest.Mock).mockRejectedValueOnce(
      new Error('AI offline')
    );
    renderEditor(null);
    fireEvent.change(screen.getByLabelText(/Blueprint Title\*/i), {
      target: { value: 'AI Test Title' },
    });
    fireEvent.click(screen.getByTitle(/Summon Cosmic Muse/i));
    await waitFor(() => {
      expect(localStorageService.generateIdeaBoilerplate).toHaveBeenCalledWith('AI Test Title');
    });
    expect(mockAddNotification).toHaveBeenCalledWith(
      'Cosmic Muse is unreachable. Try again later!',
      'error'
    );
  });

  test('AI summarize notes handles AI error', async () => {
    (localStorageService.summarizeIdea as jest.Mock).mockRejectedValueOnce(
      new Error('AI unavailable')
    );
    renderEditor(null);
    const notesTextArea = screen.getByPlaceholderText(/Sketch your constellations here/i);
    fireEvent.change(notesTextArea, { target: { value: 'Some notes to summarize.' } });
    fireEvent.click(screen.getByTitle(/Consult AI Oracle/i));
    await waitFor(() => {
      expect(localStorageService.summarizeIdea).toHaveBeenCalled();
    });
    expect(mockAddNotification).toHaveBeenCalledWith(
      'AI Oracle is unavailable. Try again later!',
      'error'
    );
  });

  test('handles file drop and processes binary attachments', async () => {
    renderEditor(null);
    const dropzone = screen
      .getByPlaceholderText(/Sketch your constellations here/i)
      .closest('div[class*="md:col-span-3"]');
    if (!dropzone) throw new Error('Dropzone not found');

    const binFile = new File([new Uint8Array([0, 255, 127])], 'binfile.bin', {
      type: 'application/octet-stream',
    });
    (fileService.readFileAsText as jest.Mock).mockRejectedValueOnce(new Error('Not text'));
    (fileService.readFileAsBase64 as jest.Mock).mockResolvedValueOnce(
      'data:application/octet-stream;base64,AP9/'
    );
    const dataTransfer = { files: [binFile], types: ['Files'] };

    await act(async () => {
      fireEvent.dragOver(dropzone, { dataTransfer });
      fireEvent.drop(dropzone, { dataTransfer });
    });
    await waitFor(() => {
      expect(fileService.readFileAsBase64).toHaveBeenCalledWith(binFile);
    });
    expect(mockAddNotification).toHaveBeenCalledWith('Materializing your artifacts...', 'info');
  });

  test('handles file drop error', async () => {
    renderEditor(null);
    const dropzone = screen
      .getByPlaceholderText(/Sketch your constellations here/i)
      .closest('div[class*="md:col-span-3"]');
    if (!dropzone) throw new Error('Dropzone not found');

    const badFile = new File(['bad'], 'badfile.txt', { type: 'text/plain' });
    (fileService.readFileAsText as jest.Mock).mockRejectedValueOnce(new Error('Read error'));
    (fileService.readFileAsBase64 as jest.Mock).mockRejectedValueOnce(new Error('Base64 error'));
    const dataTransfer = { files: [badFile], types: ['Files'] };

    await act(async () => {
      fireEvent.dragOver(dropzone, { dataTransfer });
      fireEvent.drop(dropzone, { dataTransfer });
    });
    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalledWith(
        'Failed to process some files: Base64 error',
        'error'
      );
    });
  });

  test('calls onChange with updated idea', () => {
    const idea = { id: '1', title: 'A', content: 'B', createdAt: '', updatedAt: '' };
    const onChange = jest.fn();
    const { getByText, getByDisplayValue } = render(<IdeaEditor idea={idea} onChange={onChange} />);
    fireEvent.change(getByDisplayValue('A'), { target: { value: 'New Title' } });
    fireEvent.click(getByText('Save'));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Title' }));
  });
});
