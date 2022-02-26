import { TestBed } from '@angular/core/testing';

import { ApiGithubService } from './api-github.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { APICONSTANTS } from '../shared/consts/APICONSTANTS';
import { testingConsts } from '../shared/consts/testingConsts';
import { HttpClient } from '@angular/common/http';


describe('ApiGithubService', () => {
  let service: ApiGithubService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiGithubService,
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ApiGithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get Repos & Repos Paginated', () => {
    it('should call get repos with the correct URL', (done: DoneFn) => {

      service.repos$.subscribe(
        (_) => {

        }
      )

      const req = httpTestingController.expectOne(APICONSTANTS.base + APICONSTANTS.reposUrl + `?per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush(testingConsts.repos,
        {
          headers: { 'link': testingConsts.link },
        }
      );

      const reqTwo = httpTestingController.expectOne(`${APICONSTANTS.base}${APICONSTANTS.reposUrl}?page=${testingConsts.page}&per_page=${APICONSTANTS.pageSize}`)

      expect(reqTwo.request.method).toBe('GET');

      reqTwo.flush([]);
      httpTestingController.verify()

      done()
    });
  });



  describe('get Contributors', () => {
    it('schould call get contributors with the correct URL', (done: DoneFn) => {

      service.contributors$.subscribe(
        (data) => {
        }
      )


      const req = httpTestingController.expectOne(APICONSTANTS.base + APICONSTANTS.reposUrl + `?per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush(testingConsts.repos,
        {
          headers: { 'link': testingConsts.link },
        }
      );

      const reqTwo = httpTestingController.expectOne(`${APICONSTANTS.base}${APICONSTANTS.reposUrl}?page=${testingConsts.page}&per_page=${APICONSTANTS.pageSize}`)

      expect(reqTwo.request.method).toBe('GET');

      reqTwo.flush(testingConsts.repos);


      const contributorsRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/${testingConsts.repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}`)

      expect(contributorsRequest.request.method).toBe('GET');

      contributorsRequest.flush(testingConsts.contributors);

      done()


    });
  });


  describe('get Contributors Paginated', () => {
    it('schould call get contributors paginated with the correct URL', (done: DoneFn) => {

      service.contributorsPaginated$.subscribe(
        (data) => {
        }
      )


      const req = httpTestingController.expectOne(APICONSTANTS.base + APICONSTANTS.reposUrl + `?per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush(testingConsts.repos,
        {
          headers: { 'link': testingConsts.link },
        }
      );

      const reqTwo = httpTestingController.expectOne(`${APICONSTANTS.base}${APICONSTANTS.reposUrl}?page=${testingConsts.page}&per_page=${APICONSTANTS.pageSize}`)

      expect(reqTwo.request.method).toBe('GET');

      reqTwo.flush(testingConsts.repos);


      const contributorsRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/${testingConsts.repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}`)

      expect(contributorsRequest.request.method).toBe('GET');

      contributorsRequest.flush(testingConsts.contributors,
        {
          headers: { 'link': testingConsts.link },
        });

      const contributorsPaginatedRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/${testingConsts.repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}&page=${testingConsts.page}`)

      expect(contributorsPaginatedRequest.request.method).toBe('GET');

      contributorsPaginatedRequest.flush(testingConsts.contributors);

      done()


    });
  });



  describe('get USERD', () => {
    it('should call get users with the correct URL', (done: DoneFn) => {

      service.users$.subscribe(
        (data) => {
        }
      )


      const req = httpTestingController.expectOne(APICONSTANTS.base + APICONSTANTS.reposUrl + `?per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush(testingConsts.repos,
        {
          headers: { 'link': testingConsts.link },
        }
      );

      const reqTwo = httpTestingController.expectOne(`${APICONSTANTS.base}${APICONSTANTS.reposUrl}?page=${testingConsts.page}&per_page=${APICONSTANTS.pageSize}`)

      expect(reqTwo.request.method).toBe('GET');

      reqTwo.flush(testingConsts.repos);


      const contributorsRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/${testingConsts.repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}`)

      expect(contributorsRequest.request.method).toBe('GET');

      contributorsRequest.flush(testingConsts.contributors,
        {
          headers: { 'link': testingConsts.link },
        });

      const contributorsPaginatedRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/${testingConsts.repo_fullname}/contributors?&per_page=${APICONSTANTS.pageSize}&page=${testingConsts.page}`)

      expect(contributorsPaginatedRequest.request.method).toBe('GET');

      contributorsPaginatedRequest.flush(testingConsts.contributors);


      const users = httpTestingController.expectOne(`${APICONSTANTS.base}/users/${testingConsts.username}`)

      expect(users.request.method).toBe('GET');

      users.flush([]);

      done()

    });
  });

  describe('get user details', () => {
    it('should call get user details with the correct URL', () => {

      service.selectContributor(testingConsts.username)

      service.userDetails$.subscribe(
        (_) => {
        }
      )

      const req = httpTestingController.expectOne(`${APICONSTANTS.base}/users/${testingConsts.username}`)

      expect(req.request.method).toBe('GET');

      req.flush([]);

    });
  });

  describe('get repo contributors ', () => {
    it('should call get repo contributors with the correct URL', () => {

      service.selectRepo(testingConsts.repo_name)

      service.repoContributors$.subscribe(
        (_) => {
        }
      )

      const req = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/angular/${testingConsts.repo_name}/contributors?&per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush([]);

    });
  });

  describe('get repo contributors paginated ', () => {
    it('should call get repo contributors paginated with the correct URL', (done: DoneFn) => {

      service.selectRepo(testingConsts.repo_name)

      service.repoContributorsPaginated$.subscribe(
        (_) => {
        }
      )

      const req = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/angular/${testingConsts.repo_name}/contributors?&per_page=${APICONSTANTS.pageSize}`)

      expect(req.request.method).toBe('GET');

      req.flush(testingConsts.contributors,
        {
          headers: { 'link': testingConsts.link },
        });

      const paginatedRequest = httpTestingController.expectOne(`${APICONSTANTS.base}/repos/angular/${testingConsts.repo_name}/contributors?&per_page=${APICONSTANTS.pageSize}&page=${testingConsts.page}`)

      expect(paginatedRequest.request.method).toBe('GET');

      paginatedRequest.flush([]);

      done()

    });
  });

});
