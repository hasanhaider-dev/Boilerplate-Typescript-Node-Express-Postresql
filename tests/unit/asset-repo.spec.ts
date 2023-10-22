import { Asset } from 'src/common/models';
import { AssetRepo } from '../../src/common/repositories'; // Import your service\

const mockDatabaseService = {
  getDBClient: jest.fn(),
};

// Mock the dbClient
const mockDBClient = {
  query: jest.fn(),
};

mockDatabaseService.getDBClient.mockReturnValue(mockDBClient);

const assetRepo = new AssetRepo(mockDatabaseService as any);

describe('AssetRepo', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new asset successfully', async () => {
      mockDBClient.query.mockResolvedValue({
        rows: [
          {
            created_at: '2023-10-22',
            id: '1',
            name: 'Asset 1',
            type: 'Type 1',
          },
        ],
      });

      const asset = { name: 'Asset 1', type: 'Type 1' };
      const result = await assetRepo.create(asset as Asset);

      expect(result.success).toBe(true);
      expect(result.payload).toEqual({
        createdAt: '2023-10-22',
        id: '1',
        name: 'Asset 1',
        type: 'Type 1',
      });

    });

    it('should handle errors when creating an asset', async () => {
      mockDBClient.query.mockRejectedValue(new Error('Database error'));

      const asset = { name: 'Asset 1', type: 'Type 1' };
      const result = await assetRepo.create(asset as Asset);

      expect(result.success).toBe(false);
      expect(result.payload).toBeNull();
      expect(result.error).toBeInstanceOf(Error);

    });
  });

  describe('getByID', () => {
    it('should get an asset by ID successfully', async () => {
      mockDBClient.query.mockResolvedValue({
        rows: [
          {
            created_at: '2023-10-22',
            id: '1',
            name: 'Asset 1',
            type: 'Type 1',
          },
        ],
      });

      const assetID = '1';
      const result = await assetRepo.getByID(assetID);

      expect(result.success).toBe(true);
      expect(result.payload).toEqual({
        createdAt: '2023-10-22',
        id: '1',
        name: 'Asset 1',
        type: 'Type 1',
      });

    });

    it('should handle errors when getting an asset by ID', async () => {
      mockDBClient.query.mockRejectedValue(new Error('Database error'));

      const assetID = '1';
      const result = await assetRepo.getByID(assetID);

      expect(result.success).toBe(false);
      expect(result.payload).toBeNull();
      expect(result.error).toBeInstanceOf(Error);

    });
  });
});
