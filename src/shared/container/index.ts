import { container } from 'tsyringe';
import DnaRepository from '../../infra/database/repositories/DnaRepository';
import IDnaRepository from '../../infra/database/repositories/IDnaRepository';

container.registerSingleton<IDnaRepository>(
    'DnaRepository',
    DnaRepository,
);
