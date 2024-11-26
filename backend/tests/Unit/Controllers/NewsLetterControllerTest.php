<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\NewsLetterController;
use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Mockery;
use Tests\TestCase;

class NewsLetterControllerTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testSubscribeSuccess()
    {
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('validate')->once();
        $requestMock->shouldReceive('input')->with('email')->andReturn('test@example.com');
        $requestMock->email = 'test@example.com';

        $newsletterMock = Mockery::mock('alias:App\Models\NewsLetter');
        $newsletterMock->shouldReceive('where->exists')->once()->andReturn(false);
        $newsletterMock->shouldReceive('create')
            ->once()
            ->with(['email' => 'test@example.com'])
            ->andReturn((object)['email' => 'test@example.com']);

        $controller = new NewsLetterController();

        $response = $controller->subscribe($requestMock);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($response->getData()->success);
        $this->assertEquals('test@example.com', $response->getData()->subscribe->email);
    }

    public function testSubscribeEmailAlreadyExists()
    {
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('validate')->once();
        $requestMock->shouldReceive('input')->with('email')->andReturn('test@example.com');
        $requestMock->email = 'test@example.com';

        $newsletterMock = Mockery::mock('alias:App\Models\NewsLetter');
        $newsletterMock->shouldReceive('where->exists')->once()->andReturn(true);

        $controller = new NewsLetterController();

        $response = $controller->subscribe($requestMock);

        $this->assertEquals(409, $response->getStatusCode());
        $this->assertFalse($response->getData()->status);
        $this->assertEquals('A user with this email already exists!', $response->getData()->message);
    }

    public function testSubscribeFailure()
    {
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('validate')->once();
        $requestMock->shouldReceive('input')->with('email')->andReturn('test@example.com');
        $requestMock->email = 'test@example.com';

        $newsletterMock = Mockery::mock('alias:App\Models\NewsLetter');
        $newsletterMock->shouldReceive('where->exists')->once()->andReturn(false);
        $newsletterMock->shouldReceive('create')->once()->andReturn(false);

        $controller = new NewsLetterController();

        $response = $controller->subscribe($requestMock);

        $this->assertEquals(412, $response->getStatusCode());
        $this->assertFalse($response->getData()->success);
    }
}
