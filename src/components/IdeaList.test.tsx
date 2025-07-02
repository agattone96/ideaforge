import React from 'react';
import * as localStorageService from '@/services/localStorageService';
import * as fileService from '@/services/fileService';
// Mock virtualization libraries for consistent rendering in tests
jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }: any) =>
      children({ height: 600, width: 800 })
);
jest.mock('react-window', () => ({
  FixedSizeGrid: ({ columnCount, rowCount, children }: any) => (
    <>
      {Array.from({ length: rowCount }).flatMap((_, rowIndex) =>
        Array.from({ length: columnCount }).map((_, columnIndex) => (
          <div key={`${rowIndex}-${columnIndex}`}>
            {children({ columnIndex, rowIndex, style: {} })}
          </div>
        ))
      )}
    </>
  ),
}));
jest.mock(
  './BlueprintCard',
  () =>
    function ({
      item,
      type,
      onSelect,
      onDelete,
    }: {
      item: Project | Idea;
      type: string;
      onSelect: () => void;
      onDelete: () => void;
    }) {
      return (
        <div data-testid={`blueprint-card-${item.id}`} onClick={onSelect}>
          <span>{(item as Idea).title || (item as Project).name}</span>
          <button onClick={onDelete} data-testid={`delete-btn-${item.id}`}>
            Delete Mock
          </button>
        </div>
      );
    }
);
jest.mock(
  './Button',
  () =>
    function ({
      children,
      ...props
    }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
      return <button {...props}>{children}</button>;
    }
);
jest.mock(
  './Modal',
  () =>
    function ({
      isOpen,
      title,
      children,
      onClose,
    }: {
      isOpen: boolean;
      title: string;
      children: React.ReactNode;
      onClose: () => void;
    }) {
      return isOpen ? (
        <div data-testid="modal">
          <h2>{title}</h2>
          <div>{children}</div>
          <button onClick={onClose}>Close Modal Mock</button>
        </div>
      ) : null;
    }
);

jest.mock('@/services/localStorageService');
jest.mock('@/services/fileService');

const mockOnEditIdea = jest.fn();
const mockOnCreateNewIdea = jest.fn();
const mockOnBackToProjects = jest.fn();
const mockRefreshProject = jest.fn();
// Correct typing for mockAddNotification
const mockAddNotification: jest.MockedFunction<
  (message: string, type: NotificationType['type']) => void
> = jest.fn();

const sampleIdea1: Idea = {
  id: 'idea1',
  title: 'Eco Commute App',
  problemSolved: 'Carbon emissions',
  coreSolution: 'Gamified app',
  keyFeatures: 'Tracking, Rewards',
  targetAudience: 'Urban dwellers',
  inspirationNotes: '',
  attachments: [],
  createdAt: '2023-01-01T10:00:00Z',
  updatedAt: '2023-01-10T10:00:00Z',
};
const sampleIdea2: Idea = {
  id: 'idea2',
  title: 'AI Recipe Generator',
  problemSolved: 'Food waste',
  coreSolution: 'AI generates recipes',
  keyFeatures: 'Ingredient input, Dietary filters',
  targetAudience: 'Home cooks',
  inspirationNotes: '',
  attachments: [],
  createdAt: '2023-01-05T10:00:00Z',
  updatedAt: '2023-01-05T10:00:00Z',
};
const sampleProject: Project = {
  id: 'proj1',
  name: 'Sustainable Living Tech',
  ideas: [sampleIdea1, sampleIdea2],
  attachments: [],
  createdAt: '2023-01-01T00:00:00Z',
};

const sampleProjectWithAttachments: Project = {
  ...sampleProject,
  attachments: [
    {
      id: 'att1',
      name: 'Market_Research.pdf',
      type: 'other',
      mimeType: 'application/pdf',
      content: 'pdfcontent',
      size: 1000,
    },
    {
      id: 'att2',
      name: 'Survey_Results.png',
      type: 'image',
      mimeType: 'image/png',
      content: 'pngcontent',
      size: 500,
    },
    {
      id: 'att3',
      name: 'README.md',
      type: 'text',
      mimeType: 'text/markdown',
      content: '# Readme',
      size: 8,
    },
    {
      id: 'att4',
      name: 'strange file @#$%.zip',
      type: 'other',
      mimeType: 'application/zip',
      content: '',
      size: 0,
    },
    {
      id: 'att5',
      name: `${'verylongfilename'.repeat(10)}.txt`,
      type: 'other',
      mimeType: 'text/plain',
      content: 'x'.repeat(1000),
      size: 1000,
    },
  ],
};

describe('IdeaList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Provide default mock implementations for services
    (
      localStorageService.deleteIdeaFromProject as jest.MockedFunction<
        typeof localStorageService.deleteIdeaFromProject
      >
    ).mockImplementation(() => {});
    (
      localStorageService.updateProject as jest.MockedFunction<
        typeof localStorageService.updateProject
      >
    ).mockImplementation(() => {});
    (
      localStorageService.addAttachmentsToProject as jest.MockedFunction<
        typeof localStorageService.addAttachmentsToProject
      >
    ).mockReturnValue(sampleProjectWithAttachments);
    (
      localStorageService.deleteAttachmentFromProject as jest.MockedFunction<
        typeof localStorageService.deleteAttachmentFromProject
      >
    ).mockReturnValue(sampleProject);

    (
      fileService.exportProjectAsZip as jest.MockedFunction<typeof fileService.exportProjectAsZip>
    ).mockResolvedValue(undefined);
    (
      fileService.readFileAsBase64 as jest.MockedFunction<typeof fileService.readFileAsBase64>
    ).mockResolvedValue('data:image/png;base64,mocklogo');
    (
      fileService.readFileAsText as jest.MockedFunction<typeof fileService.readFileAsText>
    ).mockResolvedValue('mock text');
    (
      fileService.base64ToBlob as jest.MockedFunction<typeof fileService.base64ToBlob>
    ).mockReturnValue(new Blob(['mock blob content']));

    // Mock window.confirm
    window.confirm = jest.fn(() => true);
  });

  const renderIdeaList = (project: Project) => {
    render(
      <IdeaList
        project={project}
        onEditIdea={mockOnEditIdea}
        onCreateNewIdea={mockOnCreateNewIdea}
        onBackToProjects={mockOnBackToProjects}
        addNotification={mockAddNotification}
        refreshProject={mockRefreshProject}
      />
    );
  };

  test('renders project details and ideas', () => {
    renderIdeaList(sampleProject);
    expect(screen.getByText(`Constellation: ${sampleProject.name}`)).toBeInTheDocument();
    expect(screen.getByText(sampleIdea1.title)).toBeInTheDocument();
    expect(screen.getByText(sampleIdea2.title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Idea/i })).toBeInTheDocument();
  });

  test('calls onBackToProjects when back button is clicked', () => {
    renderIdeaList(sampleProject);
    fireEvent.click(screen.getByRole('button', { name: /Back to Navigator/i }));
    expect(mockOnBackToProjects).toHaveBeenCalledTimes(1);
  });

  test('calls onCreateNewIdea when "New Idea" button is clicked', () => {
    renderIdeaList(sampleProject);
    fireEvent.click(screen.getByRole('button', { name: /New Idea/i }));
    expect(mockOnCreateNewIdea).toHaveBeenCalledTimes(1);
  });

  test('allows editing an idea', () => {
    renderIdeaList(sampleProject);
    const idea1Card = screen.getByTestId(`blueprint-card-${sampleIdea1.id}`);
    fireEvent.click(idea1Card);
    expect(mockOnEditIdea).toHaveBeenCalledWith(sampleIdea1);
  });

  test('handles deleting an idea', async () => {
    renderIdeaList(sampleProject);
    const deleteButton = screen.getByTestId(`delete-btn-${sampleIdea1.id}`); // Using the mock delete button
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Modal should appear
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(`Disassemble Blueprint "${sampleIdea1.title}"?`)).toBeInTheDocument();

    // Click confirm delete in modal
    const confirmDeleteButton = screen.getByRole('button', { name: /Delete Idea/i });
    await act(async () => {
      fireEvent.click(confirmDeleteButton);
    });

    expect(localStorageService.deleteIdeaFromProject).toHaveBeenCalledWith(
      sampleProject.id,
      sampleIdea1.id
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Blueprint "${sampleIdea1.title}" disassembled.`,
      'success'
    );
    expect(mockRefreshProject).toHaveBeenCalledWith(sampleProject.id);
  });

  test('handles project export', async () => {
    renderIdeaList(sampleProject);
    const exportButton = screen.getByRole('button', { name: /Export Project/i });
    await act(async () => {
      fireEvent.click(exportButton);
    });
    expect(fileService.exportProjectAsZip).toHaveBeenCalledWith(sampleProject);
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Constellation "${sampleProject.name}" export initiated.`,
      'success'
    );
  });

  test('handles project logo upload and removal', async () => {
    renderIdeaList(sampleProject); // Initial render without logo

    const uploadInput = screen.getByLabelText('Upload project logo') as HTMLInputElement;

    // Simulate file upload
    const mockFile = new File(['mock'], 'logo.png', { type: 'image/png' });
    await act(async () => {
      fireEvent.change(uploadInput, { target: { files: [mockFile] } });
    });

    await waitFor(() => {
      expect(fileService.readFileAsBase64).toHaveBeenCalledWith(mockFile);
    });
    expect(localStorageService.updateProject).toHaveBeenCalledWith(
      expect.objectContaining({ logo: 'data:image/png;base64,mocklogo' })
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      'Constellation sigil updated successfully.',
      'success'
    );
    expect(mockRefreshProject).toHaveBeenCalledWith(sampleProject.id);

    // Simulate logo removal
    renderIdeaList({ ...sampleProject, logo: 'data:image/png;base64,mocklogo' }); // Re-render with a logo

    const removeButton = screen.getByRole('button', { name: /Remove/i }); // Button text for removing logo
    await act(async () => {
      fireEvent.click(removeButton);
    });

    expect(localStorageService.updateProject).toHaveBeenCalledWith(
      expect.objectContaining({ logo: undefined })
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      'Constellation sigil has been cleared.',
      'info'
    );
  });

  test('handles project attachment upload, download, and deletion', async () => {
    renderIdeaList(sampleProject); // Start with no attachments for upload test

    const fileUploadInput = screen.getByLabelText('Upload files to project') as HTMLInputElement;
    const mockAttachmentFile = new File(['attachment content'], 'report.txt', {
      type: 'text/plain',
    });

    await act(async () => {
      fireEvent.change(fileUploadInput, { target: { files: [mockAttachmentFile] } });
    });

    await waitFor(() => {
      expect(fileService.readFileAsText).toHaveBeenCalledWith(mockAttachmentFile);
    });
    expect(localStorageService.addAttachmentsToProject).toHaveBeenCalledWith(
      sampleProject.id,
      expect.arrayContaining([
        expect.objectContaining({ name: 'report.txt', content: 'mock text' }),
      ])
    );
    expect(mockAddNotification).toHaveBeenCalledWith(
      '1 support artifact(s) anchored to constellation.',
      'success'
    );

    // Simulate uploading a binary file (should fallback to base64)
    const binFile = new File([new Uint8Array([0, 255, 127])], 'binfile.bin', {
      type: 'application/octet-stream',
    });
    (fileService.readFileAsText as jest.Mock).mockRejectedValueOnce(new Error('Not text'));
    (fileService.readFileAsBase64 as jest.Mock).mockResolvedValueOnce(
      'data:application/octet-stream;base64,AP9/'
    );
    await act(async () => {
      fireEvent.change(fileUploadInput, { target: { files: [binFile] } });
    });
    await waitFor(() => {
      expect(fileService.readFileAsBase64).toHaveBeenCalledWith(binFile);
    });

    // Test download and deletion (re-render with edge-case attachments)
    const projectWithAttachmentForTest = {
      ...sampleProject,
      attachments: [
        {
          id: 'att1',
          name: 'report.txt',
          type: 'text' as const,
          mimeType: 'text/plain',
          content: 'bW9jayB0ZXh0',
          size: 100,
        },
        {
          id: 'att2',
          name: 'strange file @#$%.zip',
          type: 'other',
          mimeType: 'application/zip',
          content: '',
          size: 0,
        },
      ],
    };
    renderIdeaList(projectWithAttachmentForTest);

    // Download
    const downloadButtons = screen.getAllByTitle('Download file');
    fireEvent.click(downloadButtons[0]);
    expect(fileService.base64ToBlob).toHaveBeenCalledWith('bW9jayB0ZXh0', 'text/plain');
    expect(mockAddNotification).toHaveBeenCalledWith(
      'Beaming down artifact "report.txt"...',
      'info'
    );

    // Download edge-case file
    fireEvent.click(downloadButtons[1]);
    expect(fileService.base64ToBlob).toHaveBeenCalledWith('', 'application/zip');

    // Delete
    const deleteAttachmentButtons = screen.getAllByTitle('Delete file');
    fireEvent.click(deleteAttachmentButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to unlink this artifact from the constellation?'
    );
    expect(localStorageService.deleteAttachmentFromProject).toHaveBeenCalledWith(
      sampleProject.id,
      'att1'
    );
    expect(mockAddNotification).toHaveBeenCalledWith('Constellation artifact unlinked.', 'info');
  });

  test('handles export when offline or export fails', async () => {
    (fileService.exportProjectAsZip as jest.Mock).mockRejectedValueOnce(new Error('Offline'));
    renderIdeaList(sampleProject);
    const exportButton = screen.getByRole('button', { name: /Export Project/i });
    await act(async () => {
      fireEvent.click(exportButton);
    });
    expect(mockAddNotification).toHaveBeenCalledWith(
      expect.stringContaining('export failed'),
      'error'
    );
  });

  test('sorts ideas based on selection', async () => {
    renderIdeaList(sampleProject);
    const sortSelect = screen.getByLabelText(/Arrange Blueprints by:/i) as HTMLSelectElement;

    // Default is 'updatedAt_desc' -> idea1, idea2
    let ideaCards = screen.getAllByTestId(/blueprint-card-/);
    expect(ideaCards[0]).toHaveTextContent(sampleIdea1.title); // Most recently updated
    expect(ideaCards[1]).toHaveTextContent(sampleIdea2.title);

    // Sort by Title (A-Z) -> idea2, idea1
    fireEvent.change(sortSelect, { target: { value: 'title_asc' } });
    await waitFor(() => {
      ideaCards = screen.getAllByTestId(/blueprint-card-/);
      expect(ideaCards[0]).toHaveTextContent(sampleIdea2.title); // AI Recipe Generator
      expect(ideaCards[1]).toHaveTextContent(sampleIdea1.title); // Eco Commute App
    });

    // Sort by Date Created (Newest) -> idea2, idea1
    fireEvent.change(sortSelect, { target: { value: 'createdAt_desc' } });
    await waitFor(() => {
      ideaCards = screen.getAllByTestId(/blueprint-card-/);
      expect(ideaCards[0]).toHaveTextContent(sampleIdea2.title);
      expect(ideaCards[1]).toHaveTextContent(sampleIdea1.title);
    });
  });

  test('displays message when no ideas are present', () => {
    renderIdeaList({ ...sampleProject, ideas: [] });
    expect(screen.getByText(/This constellation holds no blueprints yet./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Chart your first blueprint by selecting 'New Idea'./i)
    ).toBeInTheDocument();
  });

  test('displays message when no project attachments are present', () => {
    renderIdeaList({ ...sampleProject, attachments: [] });
    expect(
      screen.getByText(/No support artifacts anchored to this constellation yet./i)
    ).toBeInTheDocument();
  });

  test('renders ideas and handles select', () => {
    const ideas = [{ id: '1', title: 'Idea 1', content: '', createdAt: '', updatedAt: '' }];
    const onSelect = jest.fn();
    render(<IdeaList ideas={ideas} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Idea 1'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
