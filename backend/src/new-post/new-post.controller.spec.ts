import { Test, TestingModule } from '@nestjs/testing';
import { NewPostController } from './new-post.controller';

describe('NewPostController', () => {
  let controller: NewPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewPostController],
    }).compile();

    controller = module.get<NewPostController>(NewPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
