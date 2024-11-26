<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\InfoController;
use App\Models\Info;
use Illuminate\Http\Request;
use Mockery;
use Tests\TestCase;

class InfoControllerTest extends TestCase
{
    public function testInfoMailSuccess()
    {
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('validate')->once();
        $requestMock->name = 'Test Name';
        $requestMock->email = 'test@example.com';
        $requestMock->message = 'Test Message';

        $infoMock = Mockery::mock('alias:App\Models\Info');
        $infoMock->shouldReceive('create')
            ->once()
            ->with([
                'name' => 'Test Name',
                'email' => 'test@example.com',
                'message' => 'Test Message'
            ])
            ->andReturn((object)[
                'name' => 'Test Name',
                'email' => 'test@example.com',
                'message' => 'Test Message'
            ]);

        $controller = new InfoController();

        $response = $controller->infoMail($requestMock);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertTrue($response->getData()->success);
        $this->assertEquals('Test Name', $response->getData()->mail->name);
        $this->assertEquals('test@example.com', $response->getData()->mail->email);
        $this->assertEquals('Test Message', $response->getData()->mail->message);
    }

    public function testInfoMailFailure()
    {
        $requestMock = Mockery::mock(Request::class);
        $requestMock->shouldReceive('validate')->once();
        $requestMock->name = 'Test Name';
        $requestMock->email = 'test@example.com';
        $requestMock->message = 'Test Message';

        $infoMock = Mockery::mock('alias:App\Models\Info');
        $infoMock->shouldReceive('create')
            ->once()
            ->andReturn(false);

        $controller = new InfoController();

        $response = $controller->infoMail($requestMock);

        $this->assertEquals(412, $response->getStatusCode());
        $this->assertFalse($response->getData()->success);
    }
}
